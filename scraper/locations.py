import json
import random

badge_ids = ["0-boulder", "0-cascade",
             "0-thunder", "0-rainbow",
             "0-soul", "0-marsh",
             "0-volcano", "0-earth"]

location_names = set()

def get_locations(pokemon):
    output_list = []
    locations = pokemon["location"]
    for location in locations:
        if location in location_names:
            continue
        location_names.add(location)

        if "route" in location.lower():
            routeNumber = location.split(" ")[1]
        else:
            routeNumber = -1
        badge_id = random.choice(badge_ids)
        output_list.append(f"('{location}', '{badge_id}', 'Pokemon FireRed', {routeNumber})")
    return output_list

with open("../data/generation1-pokemon.json", "r") as file:
    data = json.load(file)

all_locations = []
for pokemon in data:
    all_locations.extend(get_locations(pokemon))

for location in all_locations:
    print(location + ",")