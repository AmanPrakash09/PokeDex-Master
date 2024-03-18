import json


def pokemon_to_pokemonstores2(poke):
    return f"('{poke["name"]}', '{"/".join(poke["poke_types"])}', '{"/".join(poke["egg_groups"])}'),\n"

def pokemon_to_pokemonstores1(poke):
    return f"('{poke["id"]}', '{poke["name"]}', 0, '{"/".join(poke["abilities"])}', 000000000000, NULL, NULL),\n"

def pokemon_to_contains(poke):
    out_str = ""
    for location in poke["location"]:
        out_str += f"('{poke["id"]}', '{location}'),\n"
    return out_str


with open("../data/generation1-pokemon.json", "r") as file:
    data = json.load(file)

with open("../data/generation1-contains.txt", "w") as file:
    for pokemon in data:
        file.write(pokemon_to_contains(pokemon))
