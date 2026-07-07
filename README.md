# Notes API

A production-ready RESTful Notes API built using Node.js, Express.js, and MongoDB (Mongoose) following clean MVC architecture patterns.

## Features

- **MVC Architecture**: Clear separation of database schemas (Models), business logic (Controllers), and endpoints (Routes).
- **Environment Configuration**: Load variables cleanly using `dotenv`.
- **CORS Enabled**: Cross-Origin Resource Sharing is pre-configured.
- **Robust Centralized Error Handling**: Detailed, formatted error responses for model validation errors, database query issues, invalid ObjectIds, and 404 route misses.
- **Auto-Reloading**: Configured with `nodemon` for local development.

---

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **ORM**: Mongoose
- **Development Tooling**: Nodemon, Dotenv, Cors

---

## Folder Structure

```text
notes-api/
│
├── config/
│   └── db.js            # MongoDB database connection helper
│
├── controllers/
│   └── noteController.js# CRUD endpoint controller logic
│
├── models/
│   └── Note.js          # Mongoose schema for the Note model
│
├── routes/
│   └── noteRoutes.js    # Note endpoints definition
│
├── middleware/
│   └── errorHandler.js  # Centralized error handler middleware
│
├── .env                 # Environment variables (local)
├── .env.example         # Template for environment variables
├── app.js               # Application entry point
├── package.json         # Node dependency definition
└── README.md            # Technical documentation
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [MongoDB](https://www.mongodb.com/) (running locally or a MongoDB Atlas URI)

### Installation

1. Clone or download the repository into your workspace directory.
2. Open a terminal in the project folder.
3. Install dependencies:
   ```bash
   npm install
   ```

### Configuration

Copy the template environment configuration file:

```bash
# Windows command
copy .env.example .env

# macOS / Linux command
cp .env.example .env
```

Ensure the configuration values match your database server details:

```ini
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/notesdb
NODE_ENV=development
```

### Running the Application

- **Development Mode (with auto-reload/hot-reload)**:
  ```bash
  npm run dev
  ```
- **Production Mode**:
  ```bash
  npm start
  ```

---

## API Documentation

All routes are prefixed with `/api/notes`.

### Response Format

#### Success Response
```json
{
  "success": true,
  "message": "Action description message",
  "data": {} // or Array of objects
}
```

#### Error Response
```json
{
  "success": false,
  "message": "Detailed error message"
}
```

---

### Endpoints

#### 1. Retrieve All Notes
- **Route**: `GET /api/notes`
- **Response**: `200 OK`
```json
{
  "success": true,
  "message": "Notes retrieved successfully",
  "data": [
    {
      "_id": "647f08cf2b8c9d001b97950c",
      "title": "Shopping List",
      "content": "Buy milk, eggs, bread, and fruits.",
      "createdAt": "2026-07-08T04:25:19.123Z",
      "updatedAt": "2026-07-08T04:25:19.123Z",
      "__v": 0
    }
  ]
}
```

#### 2. Create a Note
- **Route**: `POST /api/notes`
- **Body** (application/json):
```json
{
  "title": "Shopping List",
  "content": "Buy milk, eggs, bread, and fruits."
}
```
- **Response**: `201 Created`
```json
{
  "success": true,
  "message": "Note created successfully",
  "data": {
    "title": "Shopping List",
    "content": "Buy milk, eggs, bread, and fruits.",
    "_id": "647f08cf2b8c9d001b97950c",
    "createdAt": "2026-07-08T04:25:19.123Z",
    "updatedAt": "2026-07-08T04:25:19.123Z",
    "__v": 0
  }
}
```

#### 3. Retrieve Single Note by ID
- **Route**: `GET /api/notes/:id`
- **Response**: `200 OK`
```json
{
  "success": true,
  "message": "Note retrieved successfully",
  "data": {
    "_id": "647f08cf2b8c9d001b97950c",
    "title": "Shopping List",
    "content": "Buy milk, eggs, bread, and fruits.",
    "createdAt": "2026-07-08T04:25:19.123Z",
    "updatedAt": "2026-07-08T04:25:19.123Z",
    "__v": 0
  }
}
```

#### 4. Update Note
- **Route**: `PUT /api/notes/:id`
- **Body** (application/json, all fields optional):
```json
{
  "title": "Updated Shopping List",
  "content": "Buy almond milk, organic eggs, sourdough bread."
}
```
- **Response**: `200 OK`
```json
{
  "success": true,
  "message": "Note updated successfully",
  "data": {
    "_id": "647f08cf2b8c9d001b97950c",
    "title": "Updated Shopping List",
    "content": "Buy almond milk, organic eggs, sourdough bread.",
    "createdAt": "2026-07-08T04:25:19.123Z",
    "updatedAt": "2026-07-08T04:30:45.981Z",
    "__v": 0
  }
}
```

#### 5. Delete Note
- **Route**: `DELETE /api/notes/:id`
- **Response**: `200 OK`
```json
{
  "success": true,
  "message": "Note deleted successfully",
  "data": {}
}
```

---

## Validation & Error Scenarios

- **Missing Required Fields** (e.g. POST `/api/notes` with no title):
  Returns `400 Bad Request`
  ```json
  {
    "success": false,
    "message": "Title is required"
  }
  ```
- **Invalid ID Format** (e.g. GET `/api/notes/invalidid123`):
  Returns `400 Bad Request` (handled by Mongoose `CastError`)
  ```json
  {
    "success": false,
    "message": "Resource not found with id of invalidid123. Invalid ObjectId format."
  }
  ```
- **Note Not Found** (e.g. GET `/api/notes/647f08cf2b8c9d001b97950a`):
  Returns `404 Not Found`
  ```json
  {
    "success": false,
    "message": "Note with id 647f08cf2b8c9d001b97950a not found"
  }
  ```
- **Route Not Found** (e.g. GET `/api/invalidroute`):
  Returns `404 Not Found`
  ```json
  {
    "success": false,
    "message": "Route Not Found: GET /api/invalidroute"
  }
  ```
