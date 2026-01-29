from flask import Flask, render_template
from flask_bootstrap import Bootstrap5
from forms import ContactForm

app = Flask(__name__)

# Config for later (needed for WTForms to work securely)
app.config["SECRET_KEY"] = "your-secret-key-here"
bootstrap = Bootstrap5(app)


# d8888b.  .d88b.  db    db d888888b d88888b .d8888.
# 88  `8D .8P  Y8. 88    88 `~~88~~' 88'     88'  YP
# 88oobY' 88    88 88    88    88    88ooooo `8bo.
# 88`8b   88    88 88    88    88    88~~~~~   `Y8b.
# 88 `88. `8b  d8' 88b  d88    88    88.     db   8D
# 88   YD  `Y88P'  ~Y8888P'    YP    Y88888P `8888Y'


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/about")
def about():
    return render_template("about.html")


@app.route("/projects")
def projects():
    return render_template("projects.html")


@app.route("/contact", methods=["GET", "POST"])
def contact():
    form = ContactForm()

    # Runs when the user clicks "Submit" and data is valid
    if form.validate_on_submit():
        # TODO: send an email.
        print(f"--------------------------------")
        print(f"New Message from: {form.name.data}")
        print(f"Email: {form.email.data}")
        print(f"Message: {form.message.data}")
        print(f"--------------------------------")

        # Pass 'success=True' to the template to show a Thank You message
        return render_template("contact.html", form=form, success=True)

    return render_template("contact.html", form=form, success=False)


if __name__ == "__main__":
    app.run(debug=True, port=5000)
