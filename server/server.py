from flask import Flask, request, jsonify
import util


app = Flask(__name__)

@app.route('/get_location_names')
def get_location_names():
    response = jsonify({
        'locations':util.get_location_names()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route('/get_material_names')
def get_material_names():
    response = jsonify({
        'materials':util.get_material_names()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route('/predict_home_price', methods=['GET','POST'])
def predict_home_price():
    materials = request.form['materials']
    area_total = float(request.form['area'])
    kitchen_area = float(request.form['kitchen_area'])
    location = request.form['location']
    floor_number = int(request.form['floor_number'])
    floors_total = int(request.form['floors_total'])

    response = jsonify({
        'estimated_price': util.get_estimated_price(materials,floor_number, floors_total, area_total,kitchen_area,
                                                    location)
    })
    return response

if __name__ == "__main__":
    print("Starting Python Flask Server for home price prediction ...")
    app.run()