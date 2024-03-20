from bs4 import BeautifulSoup
import requests
import os
import re
import json

BASE_URL = "https://pokemondb.net"

DATA_FOLDER = "../data/"

GAME_MAP = {
    "Emerald": ["https://pokemondb.net/pokedex/game/ruby-sapphire-emerald", "3"],
    "FireRed": ["https://pokemondb.net/pokedex/game/firered-leafgreen", "1"]
}


class ScraperError(Exception):
    pass


class Pokemon:
    def __init__(self, id: str, name: str, poke_types: list, egg_groups: list,
                 abilities: list, location: list, lv_moves: list, tm_hm_moves: list, href: str):
        self.id = id
        self.name = name
        self.poke_types = poke_types
        self.egg_groups = egg_groups
        self.abilities = abilities
        self.location = location
        self.lv_moves = lv_moves
        self.tm_hm_moves = tm_hm_moves
        self.href = href

    def __str__(self):
        return json.dumps(self.__dict__, indent=4)

    def to_dict(self):
        poke_dict = self.__dict__
        poke_dict["lv_moves"] = [lv_move.__dict__ for lv_move in self.lv_moves]
        poke_dict["tm_hm_moves"] = [tm_move.__dict__ for tm_move in self.tm_hm_moves]
        return poke_dict


class PokemonDBScraper:
    def __init__(self, url: str) -> None:
        self.url = url

    # Save the HTML file, and parse file later. This helps prevent PokemonDB blocking our bot
    def _save_webpage(self) -> None:
        output_file = self.get_file_path()
        response = requests.get(self.url)
        if response.status_code != 200:
            raise ScraperError(f"Request with failed with url: {self.url}")
        soup = BeautifulSoup(response.content, "html.parser")
        with open(output_file, "w", encoding="utf-8") as file:
            file.write(str(soup))

    def _load_webpage(self) -> BeautifulSoup:
        file_path = self.get_file_path()
        if not os.path.exists(file_path):
            self._save_webpage()
        with open(file_path, "r", encoding="utf-8") as file:
            html_content = file.read()
            soup = BeautifulSoup(html_content, 'html.parser')
        return soup

    def get_file_path(self) -> str:
        raise NotImplementedError("Abstract method found; see child classes.")


class GameScraper(PokemonDBScraper):
    def __init__(self, game_name: str) -> None:
        if game_name not in GAME_MAP:
            raise ScraperError("Invalid game name! See game map for supported games.")
        self.game_name = game_name
        super().__init__(GAME_MAP[game_name][0])

    def get_file_path(self) -> str:
        return DATA_FOLDER + self.game_name + ".html"

    def make_pokemon(self, pokemon_infocard) -> Pokemon:
        type_pattern = re.compile(r"\bitype\b")
        id = GAME_MAP[self.game_name][1] + "-" + pokemon_infocard.find("small").text.strip("#")
        name_element = pokemon_infocard.find("a", class_="ent-name")
        type_elements = pokemon_infocard.find_all("a", class_=type_pattern)

        if not name_element or not type_elements:
            raise ScraperError("Pokemon missing name or type!")

        pokemon_name = name_element.text
        href = name_element["href"]
        types = [type_element.text for type_element in type_elements]

        poke_scraper = PokemonScraper(pokemon_name, self.game_name, href)
        abilities = poke_scraper.get_abilities()
        egg_groups = poke_scraper.get_egg_groups()
        locations = poke_scraper.get_location()
        lv_moves, tm_hm_moves = poke_scraper.get_moves()

        return Pokemon(id, pokemon_name, types,
                       egg_groups, abilities, locations, lv_moves, tm_hm_moves, href)

    def get_all_pokemon(self) -> list:
        soup = self._load_webpage()
        pokemon_grid = soup.find("div", class_="infocard-list infocard-list-pkmn-lg")
        if not pokemon_grid: raise ScraperError("No Pokemon found for this game!")
        pokemon_infocards = pokemon_grid.find_all("div", class_="infocard")
        return [self.make_pokemon(pokemon_infocard) for pokemon_infocard in pokemon_infocards]


class PokemonScraper(PokemonDBScraper):
    def __init__(self, name: str, game: str, href: str) -> None:
        self.name = name
        self.game = game
        self.href = href
        super().__init__(BASE_URL + href)

    def is_gridcol_div(self, tag, specifier: str) -> bool:
        return tag.name == "div" and \
            "grid-col" in tag.attrs.get("class", "") and \
            tag.find(lambda child: child.name == "h2" and specifier in child.get_text())

    def get_egg_groups(self):
        soup = self._load_webpage()
        breeding_div = soup.find(lambda tag: self.is_gridcol_div(tag, "Breeding"))
        egg_group_a_tags = breeding_div.find_all(
            lambda tag: tag.name == "a" and "egg-group" in tag.attrs.get("href", ""))
        return [egg_group_a_tag.get_text() for egg_group_a_tag in egg_group_a_tags]

    def get_abilities(self):
        soup = self._load_webpage()
        ability_div = soup.find(lambda tag: self.is_gridcol_div(tag, "Pokédex data"))
        ability_a_tags = ability_div.find_all(
            lambda tag: tag.name == "a" and "ability" in tag.attrs.get("href", ""))
        return [ability_a_tag.get_text() for ability_a_tag in ability_a_tags]

    def find_location_tag(self, tag):
        return (tag.name == "tr"
                and tag.find(lambda child: child.name == "span" and self.game in child.get_text()))

    def get_location(self):
        soup = self._load_webpage()
        location_div = soup.find(lambda tag: self.is_gridcol_div(tag, f"Where to find {self.name}"))
        location_tr = location_div.find(lambda tag: self.find_location_tag(tag))
        locations = [location.get_text() for location in location_tr.find_all("a")]
        new_locations = []
        for location in locations:
            if location.isnumeric():
                new_locations.append("Route " + location)
            else:
                new_locations.append(location)
        return new_locations

    def get_moves(self):
        move_scraper = MoveScraper(GAME_MAP[self.game][1], self.name, self.href)
        lv_moves, tm_moves = move_scraper.get_moves()
        return lv_moves, tm_moves
        # moves = [lv_moves.__dict__ for lv_moves in lv_moves]
        # moves2 = [tm_moves.__dict__ for tm_moves in tm_moves]
        # print(json.dumps(moves, indent=4))
        # print(json.dumps(moves2, indent=4))

    def get_file_path(self) -> str:
        return DATA_FOLDER + f"pokemon-{self.game.lower()}/" + self.name + ".html"


class Move:
    def __init__(self, name, type, category, power, accuracy):
        self.name = name
        self.type = type
        self.category = category
        self.power = power
        self.accuracy = accuracy


class LevelMove(Move):
    def __init__(self, level, name, type, category, power, accuracy):
        super().__init__(name, type, category, power, accuracy)
        self.level = level


class TMHMMove(Move):
    def __init__(self, number, name, type, category, power, accuracy):
        super().__init__(name, type, category, power, accuracy)
        self.number = number


class MoveScraper(PokemonDBScraper):
    def __init__(self, generation: str, poke_name: str, href: str) -> None:
        self.generation = generation
        self.poke_name = poke_name
        super().__init__(BASE_URL + href + "/moves/" + generation)

    def get_file_path(self) -> str:
        return DATA_FOLDER + f"{self.generation}-moves/" + self.poke_name + ".html"

    def make_level_move(self, move_tr):
        move_tds = move_tr.find_all("td")
        level = move_tds[0].get_text()
        name = move_tds[1].find("a").get_text()
        type = move_tds[2].find("a").get_text()
        category = move_tds[3].find("img").attrs.get("title")
        power = move_tds[4].get_text()
        accuracy = move_tds[5].get_text()

        if power == "\u2014": power = "-1"
        if accuracy == "\u2014": accuracy = "-1"

        return LevelMove(level, name, type, category, power, accuracy)

    def make_tm_hm_move(self, move_tr):
        move_tds = move_tr.find_all("td")
        number = move_tds[0].find("a").get_text()
        name = move_tds[1].find("a").get_text()
        type = move_tds[2].find("a").get_text()
        category = move_tds[3].find("img").attrs.get("title")
        power = move_tds[4].get_text()
        accuracy = move_tds[5].get_text()

        if power == "\u2014": power = "-1"
        if accuracy == "\u2014": accuracy = "-1"

        return TMHMMove(number, name, type, category, power, accuracy)

    def get_move_table(self, soup, id: str):
        return soup.find(lambda tag: tag.name == "table" and "data-table" in tag.attrs.get("class", "") and
                                     tag.find(lambda child: child.name == "div" and id in child.get_text()))

    def get_moves(self):
        print(f"processing moves for {self.poke_name}")
        soup = self._load_webpage()
        lv_table = self.get_move_table(soup, "Lv.")
        tm_table = self.get_move_table(soup, "TM")
        hm_table = self.get_move_table(soup, "HM")
        lv_moves, tm_moves, hm_moves = [], [], None

        if lv_table:
            lv_tbody = lv_table.find(lambda tag: tag.name == "tbody" and tag.find(lambda child: child.name == "tr"))
            lv_trs = lv_tbody.find_all("tr")
            lv_moves = [self.make_level_move(move_tr) for move_tr in lv_trs]

        if tm_table:
            tm_tbody = tm_table.find(lambda tag: tag.name == "tbody" and tag.find(lambda child: child.name == "tr"))
            tm_trs = tm_tbody.find_all("tr")
            tm_moves = [self.make_tm_hm_move(move_tr) for move_tr in tm_trs]

        if hm_table:
            hm_tbody = hm_table.find(lambda tag: tag.name == "tbody" and tag.find(lambda child: child.name == "tr"))
            hm_trs = hm_tbody.find_all("tr")
            hm_moves = [self.make_tm_hm_move(move_tr) for move_tr in hm_trs]

        if tm_moves and hm_moves:
            tm_moves.extend(hm_moves)

        return lv_moves, tm_moves


if __name__ == "__main__":
    # emerald = GameScraper("emerald")
    # pokemon-emerald = emerald.get_all_pokemon()
    # poke = PokemonScraper("Bulbasaur", "FireRed", "/pokedex/bulbasaur")
    # poke.get_moves()
    # poke_dicts = [poke.__dict__ for poke in pokemon-emerald]
    # with open(DATA_FOLDER + "generation3-pokemon-emerald.json", "w", encoding="utf-8") as f:
    #     f.write(json.dumps(poke_dicts, indent=4))
    red = GameScraper("FireRed")
    pokemon = red.get_all_pokemon()
    poke_dicts = [poke.to_dict() for poke in pokemon]
    with open(DATA_FOLDER + "generation1-pokemon.json", "w", encoding="utf-8") as f:
        f.write(json.dumps(poke_dicts, indent=4))
