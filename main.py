from flask import Flask, render_template
from flask_bootstrap import Bootstrap5

app = Flask(__name__)

# Config for later (needed for WTForms to work securely)
app.config["SECRET_KEY"] = "your-secret-key-here"

bootstrap = Bootstrap5(app)


@app.route("/")
def home():
    return render_template("index.html")


if __name__ == "__main__":
    app.run(debug=True, port=5000)
