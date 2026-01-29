# 👨‍💻 Samy Barsoum - Personal Portfolio

A modern, fully responsive personal portfolio website built to showcase my Full Stack Development projects. The application features a dark-themed UI, dynamic project rendering, and a secure SMTP contact form.

## 🚀 Live Demo
*https://samy-portfolio.onrender.com*

## 🛠️ Tech Stack
This project is built using **Python** and **Flask**, containerized with **Docker** concepts in mind.

* **Backend:** Python, Flask, Flask-Mail
* **Frontend:** Bootstrap 5 (Dark Mode), Jinja2, WTForms
* **Deployment:** Gunicorn, Render
* **Security:** Python-Dotenv (Environment Variables)

## ✨ Features
* **Dynamic Content:** Project cards and details are rendered via Python data structures, making updates easy.
* **Secure Contact Form:** Integrated with `Flask-Mail` and Gmail SMTP to send real emails.
* **Responsive Design:** Fully mobile-friendly layout using Bootstrap 5.
* **Security Best Practices:** Uses `.env` for secrets and CSRF protection via WTForms.

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

## 📫 Contact
Samy Barsoum - [https://www.linkedin.com/in/samybit](https://www.linkedin.com/in/samybit) - samyb.samir@gmail.com

Project Link: [https://github.com/samybit/my-portfolio](https://github.com/samybit/my-portfolio)