#Base image
FROM node:18-alpine

# Define build-time args
ARG ENV_TYPE=dev
ARG PORT=4000

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm ci

# Copy environment-specific .env file
COPY .env.${ENV_TYPE} .env

# Copy source code
COPY . .

# Expose port
EXPOSE ${PORT}

# Start the server
CMD ["node", "server.js"]
