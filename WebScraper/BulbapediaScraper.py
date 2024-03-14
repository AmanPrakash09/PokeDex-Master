from bs4 import BeautifulSoup
import requests
import os

DATA_FOLDER = "../data/"

GAME_MAP = {
    "emerald": "https://pokemondb.net/pokedex/game/ruby-sapphire-emerald",
    "red": "https://pokemondb.net/pokedex/game/firered-leafgreen"
}


class ScraperError(Exception):
    pass


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

    def get_pokemon(self) -> list:
        raise RuntimeError("Not implemented!")


if __name__ == "__main__":
    emerald = PokemonDBScraper("emerald")
    soup = emerald.load_webpage()
    print(soup.prettify())
