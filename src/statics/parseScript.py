import json

with open('cardInfo.txt', 'r+') as f:

    card_info = {}
    card_name = ""
    card = {}
    card_property = ""
    description = ""

    for line in f:
        if len(line) < 50 and len(line) > 3:
            card_name = line.split('-')[0].strip(' ')
            card_property = line.split('-')[1].strip(' ').replace('\n', '') 
            print(f"card:{card_name}\ncard_property:{card_property}")
        elif len(line) > 50:
            description = line.replace('\n', '')
            card.update({card_property: description})
            # card[card_property] = description
            card_info.update({card_name: card})
            card = {}
            # card_info[card_name] = card
            print(card_info)
        else:
            pass

    print(card_info)
    
    # converte to JSON str object
    json_str_object = json.dumps(card_info)
    print(json_str_object)

    # convert back to python dict
    # card_loaded = json.loads(json_str_object)
    # print(card_loaded)

    with open('cardInfo.json', 'w') as json_file:
        json_file.write(json_str_object)

var = input()

