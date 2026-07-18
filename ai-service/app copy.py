from flask import Flask

app = Flask(__name__)

@app.route("/")
def home():
    return {
        "success": True,
        "message": "MomentMatch AI Service Running"
    }

if __name__ == "__main__":
    app.run(port=8000, debug=True)