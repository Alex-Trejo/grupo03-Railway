from flask import Flask, jsonify
import os

app = Flask(__name__)

@app.route('/')
def index():
    my_set = {"Hello World, my name is: Alex Trejo", "Hello World, my name is: Karla Ansatuña"}
    
    response = jsonify(list(my_set))
    response.mimetype = "application/json; charset=utf-8"
    return response


if __name__ == '__main__':
    app.run(debug=True, port=os.getenv("PORT", default=5000))