from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/', methods=['POST', 'GET'])
def index():
    # Si formulaire validé, on recupère les données du canvas et on preprocess les données obtenues...
    if request.method == 'POST':
        return render_template('index.html', flask = "Hello from Flask!")
    else:
        pass
    return render_template('index.html')

if __name__ == "__main__":
    app.run(debug=True)