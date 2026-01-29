# 1. Use an official lightweight Python runtime
FROM python:3.11-slim

# 2. Set the working directory
WORKDIR /app

# 3. Copy requirements
COPY requirements.txt .

# 4. Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# 5. Copy the rest of the application code
COPY . .

# 6. Expose the port the app runs on
EXPOSE 5000

# 7. Define the command to run the app using Gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "main:app"]