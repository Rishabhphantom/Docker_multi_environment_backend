This backend provides RESTful API endpoints for handling data such as contact form submissions or other dynamic interactions. It supports multiple environments using .env files and is container-ready using Docker.

📦 Features
RESTful API endpoints
MySQL database integration (via mysql2)
Environment-specific configuration: .env.dev, .env.prod, .env.qa
Container-ready using Docker
Lightweight image using node:18-alpine
Reproducible builds using npm ci
🛠️ Prerequisites
Before you begin, ensure you have the following installed:

Node.js (v16 or higher)
npm (comes with Node.js)
Docker (for containerization)
📦 Installation & Setup
1. Clone the Repository
  git clone https://github.com/Rishabhphantom/Docker_multi_environment_backend.git
  cd Docker_multi_environment_backend
2. Install Dependencies
   npm install
   This will install all required packages including express, mysql2, and development tools.
🧪 Environment Configuration
This project uses three environment-specific .env files :

🟢 Development: .env.dev
NODE_ENV=development
# MYSQL CONNECTION
DB_HOST=host.docker.internal
DB_PORT=3306
DB_USER=dev_user
DB_PASSWORD=yourpassword
DB_NAME=myapp_dev
# Express server port
PORT=4000

🟡 QA / Staging: .env.qa
NODE_ENV=staging
# MYSQL CONNECTION
DB_HOST=host.docker.internal
DB_PORT=3306
DB_USER=qa_user
DB_PASSWORD=yourpassword
DB_NAME=myapp_qa
# Express server port
PORT=4001

🔵 Production: .env.prod
NODE_ENV=production
# MYSQL Connection
DB_HOST=host.docker.internal
DB_PORT=3306
DB_USER=prod_user
DB_PASSWORD=yourpassword
DB_NAME=myapp_prod
# Express server port
PORT=4002

🐳 Docker Containerization
This project includes a customized Dockerfile for multi-environment support and minimal image size.

✅ Your Dockerfile
# Base image
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

📌 Key Features:
Uses node:18-alpine for a smaller image footprint.
Supports different environments via the ENV_TYPE build argument.
Uses npm ci for consistent, reproducible builds.
Dynamically copies the correct .env file based on environment.
Sets appropriate port using EXPOSE and ARG.

🧩 Build and Run with Docker
You can build and run the app for any environment using the ENV_TYPE argument.

🟢 For Development
docker build --build-arg ENV_TYPE=dev -t backend-dev .
docker run -d -p 4000:4000 --name backend-dev backend-dev

🟡 For QA
docker build --build-arg ENV_TYPE=qa -t backend-qa .
docker run -d -p 4001:4001 --name backend-qa backend-qa

🔵 For Production
docker build --build-arg ENV_TYPE=prod -t backend-prod .
docker run -d -p 4002:4002 --name backend-prod backend-prod

⚙️ Database Setup (MySQL)
To allow your Docker containers to connect to MySQL running on your host machine, you need to update the MySQL bind address.

Step 1: Edit MySQL Config File
Open the MySQL config file:

sudo nano /etc/mysql/mysql.conf.d/mysqld.cnf

Find the line:
bind-address = 127.0.0.1

Change it to:
bind-address = 0.0.0.0

Step 2: Restart MySQL Service
sudo systemctl restart mysql

Now MySQL will accept connections from Docker containers and external networks.

🧪 Running the Server Locally
To run the server locally during development:

npm start

Ensure your database is running before starting the server.

📁 Folder Structure
/backend
├── src/
│   ├── routes/         # API route definitions
│   ├── controllers/    # Business logic
│   ├── models/         # Database models
│   ├── config/         # DB connection and configs
│   └── server.js       # Express server entry point
├── .env.dev            # Development environment variables
├── .env.prod           # Production environment variables
├── .env.qa             # QA/Staging environment variables
├── Dockerfile          # Docker image definition
├── package.json        # NPM dependencies and scripts
└── README.md           # This file

📦 Package Management
All dependencies are managed through package.json. Use the following commands:

npm install
Install all dependencies
npm install mysql2
Add new dependency
npm install express --save-dev
Add dev dependency
npm outdated
Check for outdated packages
npm update
Update packages

Always commit changes to package.json and package-lock.json.

🚀 Deployment
For production deployments:

Use Docker containers
Set secure environment variables in production
Monitor logs using docker logs <container-name>
Scale using Docker Swarm or Kubernetes if needed









