from flask import Flask, render_template

app = Flask(__name__)

# Ruta principal
@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)  # Escucha en todas las interfaces en el puerto 8080
