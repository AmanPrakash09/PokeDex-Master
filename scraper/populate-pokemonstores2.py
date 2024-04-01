import json


with open("../data/generation1-pokemon.json", "r") as json_file:
    data = json.load(json_file)

def get_pokemon_store(pokemon):
    return f"('{pokemon['name']}', '{'/'.join(pokemon['poke_types'])}', '{'/'.join(pokemon['egg_groups'])}'),"


for pokemon in data:
    print(get_pokemon_store(pokemon))