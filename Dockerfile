# Use official Node.js LTS image as base
FROM node:18

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files into the container
COPY . .

# Expose the port that your app will run on
EXPOSE 3127

# Command to run your application
CMD ["node", "app.js"]
