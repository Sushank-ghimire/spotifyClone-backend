# 🎵 SpotifyClone Backend

This is the backend service for the **SpotifyClone** application. It handles user authentication, database management, and real-time communication to support a rich music streaming experience. Built using modern technologies such as **Node.js**, **Express.js**, **Mongoose**, **Socket.IO**, and **Clerk**, this backend is designed to provide a scalable and robust foundation for the SpotifyClone frontend.

---

## 📑 Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [User Routes](#user-routes)
  - [Admin Routes](#admin-routes)
  - [Stats Routes](#stats-routes)
- [Socket.IO Events](#socketio-events)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## 🛠️ Tech Stack

- **Node.js**: JavaScript runtime environment for server-side logic.
- **Express.js**: Web framework for building RESTful APIs.
- **Mongoose**: MongoDB object modeling for Node.js.
- **Socket.IO**: Real-time, bidirectional communication between the server and clients.
- **Clerk/Express**: Authentication and session management.

---

## ✨ Features

- **User Authentication**: Sign up, login, and manage sessions using Clerk.
- **Music Streaming**: Real-time music playback and controls.
- **Album & Song Management**: Create, update, and manage songs and albums.
- **Search**: Find songs, artists, and albums.
- **Real-time Messaging**: Chat with other users using Socket.IO.
- **Scalable Architecture**: Modular and maintainable code structure.

---

## 🚀 Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/Sushank-ghimire/SpotifyClone-backend.git
   cd SpotifyClone-backend
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:  
   Create a `.env` file in the root directory and add the following variables:

   ```env
   PORT=3000
   MONGO_URI="mongodb://localhost:27017/Spotify"
   NODE_ENV="development"
   ADMIN_EMAIL=
   ADMIN_PASSWORD=
   ACCESS_TOKEN_SECRET=
   JWT_SECRET_KEY=
   REFRESH_TOKEN_SECRET=
   CLOUDINARY_CLOUD_NAME=
   CLOUDINARY_URL=
   CLOUDINARY_API_KEY=
   CLOUDINARY_API_SECRET=
   CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=
   ```

4. **Run the Server**:

   ```bash
   npm run start
   ```

   The server will start on `http://localhost:3000`.

---

## 📡 API Endpoints

### **Authentication**

- **POST** `/api/v1/users/register`: Register a new user.

---

### **User Routes**

#### **Songs**
- **GET** `/api/v1/songs`: Fetch all available songs.
- **GET** `/api/v1/songs/:id`: Get details of a specific song by ID.
- **GET** `/api/v1/songs/trending`: Get the trending songs.
- **GET** `/api/v1/songs/made-for-you`: Get the songs of your choice and you liked.
- **GET** `/api/v1/songs/featured`: Get the featured songs.

#### **Albums**
- **GET** `/api/v1/album`: Fetch all available albums.
- **GET** `/api/v1/album/:id`: Get details of a specific album by ID.

---

## 🔐 Admin Routes (`/api/v1/admin`)

These routes are restricted to admin users and require authentication.

### **Admin Authentication**
- **GET** `/api/v1/admin/check`
  - **Description**: Verifies if the logged-in user has admin privileges.
  - **Response**:
    - `200 OK`: `{ isAdmin: true }`
    - `403 Forbidden`: `{ error: "Not authorized" }`

### **Admin Songs Management**
- **POST** `/api/v1/admin/songs/create`
  - **Description**: Adds a new song to the database.
  - **Body Parameters**:
    ```json
    {
      "title": "Song Title",
      "artist": "Artist Name",
      "album": "Album ID",
      "duration": "3:45",
      "genre": "Pop"
    }
    ```
  - **Response**:
    - `201 Created`: `{ message: "Song created successfully" }`
    - `400 Bad Request`: `{ error: "Invalid data" }`

- **DELETE** `/api/v1/admin/songs/:songId`
  - **Description**: Deletes a song by its ID.
  - **Response**:
    - `200 OK`: `{ message: "Song deleted successfully" }`
    - `404 Not Found`: `{ error: "Song not found" }`

- **GET** `/api/v1/admin/allsongs`
  - **Description**: Retrieves a list of all songs.
  - **Response**: Array of song objects.

### **Admin Album Management**
- **POST** `/api/v1/admin/album/create`
  - **Description**: Creates a new album.
  - **Body Parameters**:
    ```json
    {
      "name": "Album Name",
      "artist": "Artist Name",
      "releaseDate": "2024-01-01",
      "coverImage": "URL of cover image"
    }
    ```
  - **Response**:
    - `201 Created`: `{ message: "Album created successfully" }`

- **DELETE** `/api/v1/admin/album/:albumId`
  - **Description**: Deletes an album by its ID.
  - **Response**:
    - `200 OK`: `{ message: "Album deleted successfully" }`
    - `404 Not Found`: `{ error: "Album not found" }`

---

## 📊 Stats Routes (`/api/v1/stats`)

The stats routes are only accessible by admins.

- **GET** `/api/v1/stats/totalStats`
  - **Description**: Retrieves overall statistics about songs, albums, and users.
  - **Response**:
    - `200 OK`: `{ totalUsers, totalSongs, totalAlbums }`
    - `403 Forbidden`: `{ error: "Not authorized" }`

---

## 🔌 Socket.IO Events

| Event            | Description                          |
| ---------------- | ------------------------------------ |
| `connection`     | Establish a connection with a client |
| `joinRoom`       | Join a specific chat room            |
| `sendMessage`    | Send a message to the room           |
| `receiveMessage` | Listen for incoming messages         |
| `disconnect`     | Handle client disconnection          |

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to improve the project.

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch`.
3. Make your changes and commit them.
4. Push to your branch: `git push origin feature-branch`.
5. Open a pull request.

---

## 📝 License

This project is licensed under the **MIT License**.