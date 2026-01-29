# 👨‍💻 Samy Barsoum - Personal Portfolio

A modern, fully responsive personal portfolio website built to showcase my Full Stack Development projects. The application features a dark-themed UI, dynamic rendering, and a secure SMTP contact form.

## 🚀 Live Demo
[View Live Site](https://my-portfolio-seven-beta-98.vercel.app)

## 🛠️ Tech Stack
This project is built using **Python** and **Flask**, containerized with **Docker** concepts in mind.

* **Backend:** Python, Flask, Flask-Mail
* **Frontend:** Bootstrap 5 (Dark Mode), Jinja2, WTForms, Custom JS
* **Design:** Figma (Interactive Embeds), CSS3 Animations
* **Deployment:** Vercel (Serverless), Docker
* **Security:** Python-Dotenv (Environment Variables)

## ✨ Features
* **Dynamic Content:** Project cards and details are rendered via Python data structures.
* **Interactive UI:** Custom JavaScript mouse-tracking spotlights and neon text effects.
* **Secure Contact Form:** Integrated with `Flask-Mail` and Gmail SMTP to send real emails.
* **Design System:** Embedded Figma prototype showcasing UI/UX skills.
* **Responsive Design:** Fully mobile-friendly layout using Bootstrap 5.

## ⚙️ Local Installation

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/samybit/my-portfolio.git](https://github.com/samybit/my-portfolio.git)
    cd my-portfolio
    ```

2.  **Create and activate a Virtual Environment**
    ```bash
    # Windows
    python -m venv .venv
    .venv\Scripts\activate

    # Mac/Linux
    python -m venv .venv
    source .venv/bin/activate
    ```

3.  **Install Dependencies**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Set up Environment Variables**
    Create a `.env` file in the root directory and add your secrets:
    ```text
    EMAIL_USER=your-email@gmail.com
    EMAIL_PASS=your-app-password
    SECRET_KEY=your-generated-secret-key
    ```

5.  **Run the Application**
    ```bash
    python main.py
    ```
    Visit `http://127.0.0.1:5000` in your browser.

## 🐳 Run with Docker (Optional)
Since this project is fully containerized, you can run it without installing Python locally.

1.  **Build the Image**
    ```bash
    docker build -t my-portfolio .
    ```

2.  **Run the Container**
    ```bash
    docker run -p 5000:5000 --env-file .env my-portfolio
    ```

## 📫 Contact
Samy Barsoum - [LinkedIn](https://www.linkedin.com/in/samybit) - samyb.samir@gmail.com

Project Link: [https://github.com/samybit/my-portfolio](https://github.com/samybit/my-portfolio)