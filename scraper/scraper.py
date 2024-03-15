from bs4 import BeautifulSoup
import requests
import os
import re
import json

BASE_URL = "https://pokemondb.net"

DATA_FOLDER = "../data/"

GAME_MAP = {
    "emerald": ["https://pokemondb.net/pokedex/game/ruby-sapphire-emerald", "3"],
    "red": ["https://pokemondb.net/pokedex/game/firered-leafgreen", "1"]
}


class ScraperError(Exception):
    pass


class Pokemon:
    def __init__(self, id: str, name: str, poke_types: list, egg_groups: list,
                 abilities: list, href: str):
        self.id = id
        self.name = name
        self.poke_types = poke_types
        self.egg_groups = egg_groups
        self.abilities = abilities
        self.href = href

    def __str__(self):
        return json.dumps(self.__dict__, indent=4)


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

        poke_scraper = PokemonScraper(pokemon_name, href)
        abilities = poke_scraper.get_abilities()
        egg_groups = poke_scraper.get_egg_groups()

        return Pokemon(id, pokemon_name, types, egg_groups, abilities, href)

    def get_all_pokemon(self) -> list:
        soup = self._load_webpage()
        pokemon_grid = soup.find("div", class_="infocard-list infocard-list-pkmn-lg")
        if not pokemon_grid: raise ScraperError("No Pokemon found for this game!")
        pokemon_infocards = pokemon_grid.find_all("div", class_="infocard")
        return [self.make_pokemon(pokemon_infocard) for pokemon_infocard in pokemon_infocards]


class PokemonScraper(PokemonDBScraper):
    def __init__(self, name: str, href: str) -> None:
        self.name = name
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

    def get_file_path(self) -> str:
        return DATA_FOLDER + "pokemon/" + self.name + ".html"


if __name__ == "__main__":
    # emerald = GameScraper("emerald")
    # pokemon = emerald.get_all_pokemon()
    # poke_dicts = [poke.__dict__ for poke in pokemon]
    # with open(DATA_FOLDER + "generation3-pokemon.json", "w", encoding="utf-8") as f:
    #     f.write(json.dumps(poke_dicts, indent=4))
    pass
