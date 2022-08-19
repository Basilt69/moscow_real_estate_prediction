import json
import pickle
import numpy as np


__locations = None
__data_columns = None
__model = None
__materials = None

def get_estimated_price(materials, floor_number, floors_total, area_total, kitchen_area, location):
    try:
        loc_index = __data_columns.index(location.lower())
        material_index = __data_columns.index(materials.lower())
    except:
        loc_index = -1
        material_index = -1

    x = np.zeros(len(__data_columns))
    x[0] = floor_number
    x[1] = floors_total
    x[2] = area_total
    x[3] = kitchen_area

    if loc_index >= 0:
        x[loc_index] = 1

    if material_index >= 0:
        x[material_index] = 1

    return round(__model.predict([x])[0],2)


def get_location_names():
    return __locations

def get_material_names():
    return __materials

def load_saved_artifacts():
    print("loading saved artifacts ... start")
    global __data_columns
    global __locations
    global __materials

    with open("./artifacts/columns.json", 'r') as f:
        __data_columns = json.load(f)['data_columns']
        __locations = __data_columns[12:]
        __materials = __data_columns[5:12]

    global __model
    with open("./artifacts/moscow_real_estate_pred.pickle",'rb') as f:
        __model = pickle.load(f)
    print("loading saved artifacts ... done")


if __name__ == '__main__':
    load_saved_artifacts()
    print(get_location_names())