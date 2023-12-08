
# Use an official lightweight Python image.
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Install build dependencies (needed for certain Python packages)
RUN apt-get update && apt-get install -y \
    build-essential \
    python3-dev \
    libsndfile1 \
    && rm -rf /var/lib/apt/lists/*

# Copy the current directory contents into the container at /app
COPY ./server /app

# Install any needed packages specified in requirements.txt
COPY ./server/requirements.txt .
RUN pip3 install --no-cache-dir -r requirements.txt

# Make port 8080 available to the world outside this container
EXPOSE 8080

# Define environment variable
ENV PORT 8080

# Run app.py when the container launches
CMD gunicorn --bind 0.0.0.0:8080 logbaseball:app
