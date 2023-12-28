# Use the official lightweight Node.js 16 image.
FROM node:16-slim

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available) to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code and necessary files to the working directory
COPY server.js .
COPY publishSfdc.js .
COPY services/ services/
COPY google-creds.json .

# We will set environment variables directly in Heroku, so no need to copy .env

# Expose the port the app will run on
# We will use the PORT environment variable provided by Heroku, so no need to expose a specific port

# Start the application
CMD ["npm", "start"]















# # Use the official lightweight Node.js 16 image.
# FROM node:16-slim

# # Set the working directory
# WORKDIR /usr/src/app

# # Copy package.json and package-lock.json (if available) to the working directory
# COPY package*.json ./

# # Install the dependencies
# RUN npm install

# # Copy the rest of the application code and necessary files to the working directory
# COPY server.js .
# COPY publishSfdc.js .
# COPY services/ services/
# COPY google-creds.json .
# COPY .env .

# # Expose the port the app will run on
# EXPOSE 8080

# # Start the application
# CMD ["npm", "start"]







# # Use the official lightweight Node.js 16 image.
# FROM node:16-slim

# # Set the working directory
# WORKDIR /usr/src/app

# # Copy package.json and package-lock.json to the working directory
# COPY package*.json ./

# # Install the dependencies
# RUN npm install

# # Copy the rest of the application code to the working directory
# COPY . .

# # Copy the google-creds.json file to the working directory
# COPY google-creds.json /usr/src/app/google-creds.json

# # Copy the .env file to the working directory
# COPY .env /usr/src/app/.env

# # Expose the port the app will run on
# EXPOSE 8080

# # Start the application
# CMD ["npm", "start"]