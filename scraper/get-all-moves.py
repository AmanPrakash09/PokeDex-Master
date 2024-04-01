import json


move_names = set()

def get_level_moves(pokemon_object):
    output_list = []
    lv_moves = pokemon_object["lv_moves"]
    for lv_move in lv_moves:
        if lv_move["name"] not in move_names:
            move_names.add(lv_move["name"])
            output_list.append(
                f"({lv_move['accuracy']}, " +
                f"{lv_move['power']}, " +
                f"'{lv_move['type']}', " +
                f"'{lv_move['category'].upper()}', " +
                f"'{lv_move['name']}')")
    return output_list

def get_tmhm_moves(pokemon_object):
    output_list = []
    tm_moves = pokemon_object["tm_hm_moves"]
    for tm_move in tm_moves:
        if tm_move["name"] not in move_names:
            move_names.add(tm_move["name"])
            output_list.append(
                f"({tm_move['accuracy']}, " +
                f"{tm_move['power']}, " +
                f"'{tm_move['type']}', " +
                f"'{tm_move['category'].upper()}', " +
                f"'{tm_move['name']}')")
    return output_list

def get_lv_move_names(pokemon_object):
    output_list = []
    lv_moves = pokemon_object["lv_moves"]
    for lv_move in lv_moves:
        if lv_move["name"] not in move_names:
            move_names.add(lv_move["name"])
            output_list.append(f"('{lv_move['name']}')")
    return output_list

def get_tmhm_move_name_and_number(pokemon_object):
    output_list = []
    tm_moves = pokemon_object["tm_hm_moves"]
    for tm_move in tm_moves:
        if tm_move["name"] not in move_names:
            move_names.add(tm_move["name"])
            output_list.append(
                f"('{tm_move['name']}', {int(tm_move['number'])})")
    return output_list

def get_learns(pokemon_object):
    output_list = []
    learn_set = set()
    lv_moves = pokemon_object["lv_moves"]
    for lv_move in lv_moves:
        move_tuple = f"'{lv_move['name']}', '{pokemon_object['id']}'"
        if move_tuple not in learn_set:
            learn_set.add(move_tuple)
            new_move = f"('{lv_move['name']}', '{pokemon_object['id']}', {int(lv_move['level'])})"
            output_list.append(new_move)
    return output_list

def get_accesses(pokemon_object):
    output_list = []
    tm_moves = pokemon_object["tm_hm_moves"]
    for tm_move in tm_moves:
        output_list.append(f"('{tm_move['name']}', '{pokemon_object['id']}')")
    return output_list

with open("../data/generation1-pokemon.json", "r") as file:
    data = json.load(file)


all_moves = []
for pokemon in data:
    # all_moves.extend(get_level_moves(pokemon))
    # all_moves.extend(get_tmhm_moves(pokemon))
    # all_moves.extend(get_lv_move_names(pokemon))
    # all_moves.extend(get_tmhm_move_name_and_number(pokemon))
    all_moves.extend(get_learns(pokemon))
    #all_moves.extend(get_accesses(pokemon))

with open("../data/learns.txt", "w") as f2:
    for move in all_moves:
        f2.write(f"{move},\n")
