from flask import Flask, jsonify
from flask_cors import CORS

# Create the Flask application
app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# Define a route
@app.route("/")
def hello_world():
    return jsonify({"message": "Hello, Flask is running in Visual Studio!", "status": "success"})

@app.route("/api/health")
def health():
    return jsonify({"status": "healthy", "service": "flask-backend"})

# Run the app
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=False)
