# Prerequisites (Software and Tools Required)
Node.js

Purpose: Required to run JavaScript on the server.

Node.js vserion 20.15.0: [Download and install Node.js v20.15.0](https://nodejs.org/dist/v20.15.0/node-v20.15.0-x64.msi), including the npm package manager.

MongoDB

Purpose: NoSQL database used to store application data.

Download and Setup: Install MongoDB locally from [MongoDB Community Edition](https://www.mongodb.com/docs/manual/administration/install-community/).

Postman (optional)

Purpose: API testing tool used to send requests to and receive responses from the web server.

IDE or Text Editor

Suggestion: Visual Studio Code for writing and editing your source code.

# Setup Instructions
Clone the Repository

Clone the backend repository to your local machine using the command:

`git clone https://github.com/Saiteja1909/DynamicUIGeneratorWithLLM_Backend.git`

# Install Dependencies

Navigate to the project directory and run the following command to install the required dependencies:

`npm install`

# Setup Environment Variables

Create a .env file in the root of your project and define the necessary environment variables on new lines in the form of NAME=VALUE. Example:

PORT=5000

MONGODB_URI=mongodb://localhost:27017/yourDatabase

JWT_SECRET=yourSecretKey

# Start MongoDB

Ensure that MongoDB is running on your system. 

# Running the Server

Use the following command to start the server:

`node server.js`

Alternatively, you may want to install nodemon for hot reloading:

`npm install -g nodemon`

`nodemon server.js`

# Project Dependencies
express: Framework for building web applications on Node.js.

mongoose: ODM library for MongoDB and Node.js.

cors: Middleware to enable CORS (Cross-Origin Resource Sharing).

dotenv: Loads environment variables from a .env file into process.env.

bcryptjs: Library for hashing and salting user passwords.

jsonwebtoken: Used to issue JSON Web Tokens for authentication.

express-validator: Middleware for validating and sanitizing strings.

axios: Promise based HTTP client for making requests to external services.

socket.io: Enables real-time bidirectional event-based communication.

body-parser: Parse incoming request bodies in a middleware.

# Development Dependencies

chai, mocha: Used for writing and running tests.

supertest: Allows high-level abstraction for testing HTTP.

nodemon (optional): Utility that monitors for any changes in your source and automatically restarts your server.