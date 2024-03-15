from bs4 import BeautifulSoup
import requests
import os
import re
import json

DATA_FOLDER = "../data/"

GAME_MAP = {
    "emerald": "https://pokemondb.net/pokedex/game/ruby-sapphire-emerald",
    "red": "https://pokemondb.net/pokedex/game/firered-leafgreen"
}


class ScraperError(Exception):
    pass


class Pokemon:
    def __init__(self, name: str, poke_types: list, href: str):
        self.name = name
        self.poke_types = poke_types
        self.href = href

    def __str__(self):
        return f"Name: {self.name}\nTypes: {self.poke_types}\nHref: {self.href}"


class PokemonDBScraper:
    def __init__(self, game_name: str) -> None:
        if game_name not in GAME_MAP:
            raise ScraperError("Invalid game name! See game map for supported games.")
        self.game_name = game_name

    # Save the HTML file, and parse file later. This helps prevent PokemonDB blocking our bot
    def _save_webpage(self) -> None:
        url = GAME_MAP[self.game_name]
        output_file = self.get_file_path()
        response = requests.get(url)
        if response.status_code != 200:
            raise ScraperError(f"Request with failed with url: {url}")
        soup = BeautifulSoup(response.content, "html.parser")
        with open(output_file, "w", encoding="utf-8") as file:
            file.write(str(soup))

    def load_webpage(self) -> BeautifulSoup:
        file_path = self.get_file_path()
        if not os.path.exists(file_path):
            self._save_webpage()
        with open(file_path, "r", encoding="utf-8") as file:
            html_content = file.read()
            soup = BeautifulSoup(html_content, 'html.parser')
        return soup

    def get_file_path(self) -> str:
        return DATA_FOLDER + self.game_name + ".html"

    def make_pokemon(self, pokemon_infocard) -> Pokemon:
        type_pattern = re.compile(r"\bitype\b")
        name_element = pokemon_infocard.find("a", class_="ent-name")
        type_elements = pokemon_infocard.find_all("a", class_=type_pattern)

        if not name_element or not type_elements:
            raise ScraperError("Pokemon missing name or type!")

        pokemon_name = name_element.text
        href = name_element["href"]
        types = [type_element.text for type_element in type_elements]

        return Pokemon(pokemon_name, types, href)

    def get_all_pokemon(self) -> list:
        soup = self.load_webpage()
        pokemon_grid = soup.find("div", class_="infocard-list infocard-list-pkmn-lg")
        if not pokemon_grid: raise ScraperError("No Pokemon found for this game!")
        pokemon_infocards = pokemon_grid.find_all("div", class_="infocard")
        return [self.make_pokemon(pokemon_infocard) for pokemon_infocard in pokemon_infocards]


if __name__ == "__main__":
    emerald = PokemonDBScraper("emerald")
    pokemon = emerald.get_all_pokemon()
    poke_dicts = [poke.__dict__ for poke in pokemon]
    json_str = json.dumps(poke_dicts, indent=4)
    print(json_str)
