# Eco Friends

Eco Friends is a web application designed to promote and track eco-friendly actions. Users can log their eco-friendly activities, engage with the community, and view the environmental impact of their actions.

## Project Structure

The project is divided into two main directories:
- `client`: Contains the frontend code built with ReactJs & Vite.js.
- `server`: Contains the backend code built with Express.js and MongoDB.

## Setup

### Prerequisites

Make sure you have the following installed on your system:
- Node.js
- npm (Node Package Manager)

### Environment Variables

#### Client

Create a `.env` file in the `client` directory with the following structure:

```
VITE_API = "your_api_url/api"
VITE_FB_APIKEY = "your_firebase_apikey"
VITE_FB_AUTHDOMAIN = "your_firebase_authdomain"
VITE_FB_PROJECTID = "your_firebase_projectid"
VITE_FB_STORAGEBUCKET = "your_firebase_storagebucket"
VITE_FB_MESSAGINGSENDERID = "your_firebase_messagingsenderid"
VITE_FB_APPID = "your_firebase_appid"
```
note : don't forget to add the /api after the api_url


#### Server

Create a `.env` file in the `server` directory with the following structure:

```
PORT = 8080
MONGO_URL = "your_mongodb_connection_string"
JWT_SECRET = "your_jwt_secret"
```

Replace the placeholders with your actual values.

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/ashishnallana/eco-friends.git
cd eco-friends
```
### 2. Install Dependencies
#### Client
```bash
cd client
npm install
```
if there are any dependency version consflicts, try using
```bash
npm install --legacy-peer-deps
```
#### Server
```bash
cd ../server
npm install
```

## Running the Project
We use `concurrently` to run both the client and server simultaneously. The server directory contains a dev script that starts both the client and the server.
### 1. Start the Server and Client
```bash
cd server
npm run dev
```
This command will start both the client and server using `concurrently`.

### 2. Access the Application
Once the client and server are running, you can access the application in your web browser at:
```bash
http://localhost:5173
```
The server will be running on:
```bash
http://localhost:8080
```
