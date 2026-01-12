from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/api")
def api():
    return jsonify({
        "message": "Hello from Flask Backend!",
        "status": "success"
    })

if __name__ == "__main__":
    app.run(host="98.82.26.254", port=5000)
