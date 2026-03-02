import os
from dotenv import load_dotenv
from datetime import datetime
from flask import Flask, render_template, send_from_directory
from flask_bootstrap import Bootstrap5
from flask_mail import Mail, Message
from forms import ContactForm

load_dotenv()

app = Flask(__name__)

# Config
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY")

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

my_projects = [
    {
        "title": "Expense Tracker",
        "description": "A terminal-based personal finance manager in C demonstrating structs, dynamic memory, and file I/O.",
        "tech": ["C", "Memory Management", "Structure"],
        "url": "https://github.com/samybit/cli-expense-tracker",
        "style": {
            "wrapper": "c-wrapper",
            "mascot": "c-mascot",
            "img": "https://upload.wikimedia.org/wikipedia/commons/1/18/C_Programming_Language.svg",
            "bg": "linear-gradient(160deg, #1c1c1c 0%, #000000 100%)",
            "border": "#5c6bc0",
        },
    },
    {
        "title": "Lead Gen Tool",
        "description": "SaaS tool for automated e-commerce data extraction. Built with Flask, Docker, and Pandas.",
        "tech": ["Flask", "Docker", "Pandas"],
        "url": "https://github.com/samybit/lead-gen-tool",
        "style": {
            "wrapper": "snake-wrapper",
            "mascot": "snake-mascot",
            "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/600px-Python-logo-notext.svg.png",
            "bg": "linear-gradient(160deg, rgba(48, 105, 152, 0.25) 0%, #1a1a1a 100%)",
            "border": "#306998",
        },
    },
    {
        "title": "BearBuzz",
        "description": "Automated stock trading news alerts via SMS using Twilio, AlphaVantage, and NewsAPI.",
        "tech": ["Python", "Twilio API", "NewsAPI"],
        "url": "https://github.com/samybit/BearBuzz",
        "style": {
            "wrapper": "snake-wrapper",
            "mascot": "snake-mascot",
            "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/600px-Python-logo-notext.svg.png",
            "bg": "linear-gradient(160deg, rgba(242, 47, 70, 0.2) 0%, #1a1a1a 100%)",
            "border": "#F22F46",
        },
    },
    {
        "title": "Vanilla JS E-commerce",
        "description": "Full e-commerce app with role-based auth (Admin/Customer) and local storage persistence.",
        "tech": ["JavaScript", "HTML/CSS", "LocalStorage"],
        "url": "https://github.com/samybit/vanilla-js-ecommerce",
        "style": {
            "wrapper": "js-wrapper",
            "mascot": "js-mascot",
            "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/600px-JavaScript-logo.png",
            "bg": "linear-gradient(160deg, rgba(240, 219, 79, 0.1) 0%, #1a1a1a 100%)",
            "border": "#F0DB4F",
        },
    },
    {
        "title": "YearWave",
        "description": "Generates Spotify playlists from historical Billboard Hot 100 charts using Spotipy.",
        "tech": ["Python", "Spotipy", "Spotify API"],
        "url": "https://github.com/samybit/yearwave",
        "style": {
            "wrapper": "snake-wrapper",
            "mascot": "snake-mascot",
            "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/600px-Python-logo-notext.svg.png",
            "bg": "linear-gradient(160deg, rgba(29, 185, 84, 0.15) 0%, #1a1a1a 100%)",
            "border": "#1DB954",  # Spotify Green
        },
    },
    {
        "title": "TrackIt",
        "description": "A command-line interface (CLI) habit tracker built in Python using the Pixela API.",
        "tech": ["Python", "Pixela API", "CLI"],
        "url": "https://github.com/samybit/TrackIt",
        "style": {
            "wrapper": "snake-wrapper",
            "mascot": "snake-mascot",
            "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/600px-Python-logo-notext.svg.png",
            "bg": "linear-gradient(160deg, rgba(48, 105, 152, 0.15) 0%, #1a1a1a 100%)",
            "border": "#4B8BBE",  # Python Blue
        },
    },
    {
        "title": "Desktop UI Design",
        "description": "High-fidelity interactive prototype created in Figma. Features modern typography and dark mode.",
        "tech": ["Figma", "UI/UX", "Prototyping"],
        "url": "/design-system",
        "style": {
            "wrapper": "",  # No mascot wrapper needed
            "bg": "linear-gradient(160deg, rgba(242, 78, 30, 0.1) 0%, #1a1a1a 100%)",
            "border": "#F24E1E",  # Figma Orange
        },
    },
]

# d8888b.  .d88b.  db    db d888888b d88888b .d8888.
# 88  `8D .8P  Y8. 88    88 `~~88~~' 88'     88'  YP
# 88oobY' 88    88 88    88    88    88ooooo `8bo.
# 88`8b   88    88 88    88    88    88~~~~~   `Y8b.
# 88 `88. `8b  d8' 88b  d88    88    88.     db   8D
# 88   YD  `Y88P'  ~Y8888P'    YP    Y88888P `8888Y'


# get and inject current year
@app.context_processor
def inject_now():
    return {"year": datetime.now().year}


@app.route("/")
def home():
    return render_template("index.html", projects=my_projects)


@app.route("/about")
def about():
    return render_template("about.html")


@app.route("/contact", methods=["GET", "POST"])
def contact():
    form = ContactForm()

    if form.validate_on_submit():
        try:
            # 1. Create message
            msg = Message(
                subject=f"New Portfolio Message from {form.name.data}",
                recipients=[os.environ.get("EMAIL_USER")],
                sender=os.environ.get("EMAIL_USER"),
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
            # might want to pass an error flag to the template here if you want
            return render_template("contact.html", form=form, success=False)

    return render_template("contact.html", form=form, success=False)


@app.route("/design-system")
def design_system():
    return render_template("design_system.html")


@app.errorhandler(404)
def page_not_found(e):
    return render_template("404.html"), 404


@app.route("/retro-music")
def retro_music():
    # Serve the file explicitly with the correct MIME type
    return send_from_directory(
        directory=os.path.join(app.root_path, "static", "images"),
        path="retro-music.mp3",
        mimetype="audio/mpeg",
    )


if __name__ == "__main__":
    app.run(debug=True, port=5000)
