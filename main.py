import os
from flask import Flask, render_template
from flask_bootstrap import Bootstrap5
from flask_mail import Mail, Message
from forms import ContactForm

app = Flask(__name__)

# Config
app.config["SECRET_KEY"] = "your-secret-key-here"

# Gmail config
app.config["MAIL_SERVER"] = "smtp.gmail.com"
app.config["MAIL_PORT"] = 587
app.config["MAIL_USE_TLS"] = True
app.config["MAIL_USERNAME"] = os.environ.get("EMAIL_USER")
app.config["MAIL_PASSWORD"] = os.environ.get("EMAIL_PASS")
app.config["MAIL_DEFAULT_SENDER"] = os.environ.get("EMAIL_USER")

# Extensions
bootstrap = Bootstrap5(app)
mail = Mail(app)


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


my_projects = [
    {
        "title": "Portfolio V1",
        "description": "My first personal website built with raw HTML & CSS.",
        "tech": ["HTML", "CSS"],
        "url": "#",
    },
    {
        "title": "Task Master",
        "description": "A To-Do app built with Python Flask and SQLite.",
        "tech": ["Python", "Flask", "SQLite"],
        "url": "#",
    },
    {
        "title": "Weather Dashboard",
        "description": "A real-time weather checker using a public API.",
        "tech": ["JavaScript", "API", "Bootstrap"],
        "url": "#",
    },
]


@app.route("/projects")
def projects():
    return render_template("projects.html", projects=my_projects)


@app.route("/contact", methods=["GET", "POST"])
def contact():
    form = ContactForm()

    if form.validate_on_submit():
        try:
            # 1. Create message
            msg = Message(
                subject=f"New Portfolio Message from {form.name.data}",
                recipients=[os.environ.get("EMAIL_USER")],
            )

            # 2. Format body
            msg.body = f"""
            Name: {form.name.data}
            Email: {form.email.data}
            
            Message:
            {form.message.data}
            """

            # 3. Send
            mail.send(msg)

            # Pass 'success=True' to the template to show a Thank You message
            return render_template("contact.html", form=form, success=True)

        except Exception as e:
            print(f"Email Error: {e}")
            # You might want to pass an error flag to the template here if you want
            return render_template("contact.html", form=form, success=False)

    return render_template("contact.html", form=form, success=False)


if __name__ == "__main__":
    app.run(debug=True, port=5000)
