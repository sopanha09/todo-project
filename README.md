# 📝 Task Management

A full-stack task management application with a React + Vite frontend and an Express + MongoDB backend.

## ✨ Features

- 🔐 **User Authentication**

  - Register and log in with email and password
  - JWT-based authentication for secure API access

- ✅ **Task Management**

  - Create, edit, delete, and view tasks
  - Assign tasks to columns (e.g., To Do, In Progress, Done)
  - Set task priority (low, medium, high)
  - Set due dates for tasks
  - 🖱️ **Drag and drop tasks between columns on the board**

- 🗂️ **Column Management**

  - Create, edit, delete, and reorder columns
  - Assign colors to columns

- 💻 **UI**
  - Board view for Kanban-style task management
  - Responsive design with Tailwind CSS
  - Toast notifications for user feedback

## 🚀 Getting Started

### 📦 Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- MongoDB instance (local or cloud)

### 🛠️ Backend Setup

1. **Install dependencies:**

   ```sh
   cd backend
   npm install
   ```

2. **Configure environment variables:**

   - Copy `.env.example` to `.env` in the project root.
   - Fill in your MongoDB URI and a secret for JWT:
     ```
     PORT=8000
     MONGO_URI=your_mongodb_uri
     ACCESS_TOKEN_SECRET=your_secret
     ```

3. **Start the backend server:**
   ```sh
   npm run dev
   ```
   The backend will run on `http://localhost:8000`.

### 🖥️ Frontend Setup

1. **Install dependencies:**

   ```sh
   cd frontend
   npm install
   ```

2. **(Optional) Configure API URL:**

   - By default, the frontend expects the backend at `http://localhost:8000/api`.
   - To change, create a `.env` file in `frontend/` and set:
     ```
     VITE_API_URL=http://your-backend-url/api
     ```

3. **Start the frontend:**
   ```sh
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`.

## 🧑‍💻 Usage

- Open [http://localhost:5173](http://localhost:5173) in your browser.
- Register a new account and start managing your tasks!
- 🖱️ **Drag and drop tasks between columns on the board to update their status.**

## 🗂️ Project Structure

- `backend/` - Express API, MongoDB models, controllers, and routes
- `frontend/` - React app, UI components, pages, and API service

## 📜 Scripts

### Backend

- `npm run dev` - Start backend with nodemon

### Frontend

- `npm run dev` - Start frontend dev server
- `npm run build` - Build frontend for production
- `npm run preview` - Preview production build

## 🏷️ License

This project was originally developed and is currently maintained by **Sous Sopanha**.

---

**🚀 Enjoy your productivity!**
