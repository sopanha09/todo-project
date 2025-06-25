# 📝 Task Management

A full-stack task management application with a React + Vite frontend and an Express + MongoDB backend.

## 🎬 Demo

[Watch the demo video](frontend/public/task-management-demo.mp4)

![Task Management UI](frontend/public/Task%20management%20UI.jpg)

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

### ⚡ Fullstack Setup (Recommended)

1. **Install all dependencies:**

   ```sh
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
   - (Optional) For frontend API URL, create `frontend/.env` and set:
     ```
     VITE_API_URL=http://localhost:8000/api
     ```

3. **Start both backend and frontend together:**

   ```sh
   npm run dev
   ```

   - The backend runs on [http://localhost:8000](http://localhost:8000)
   - The frontend runs on [http://localhost:5173](http://localhost:5173)

---

### 🛠️ Backend Only

1. **Install dependencies:**

   ```sh
   cd backend
   npm install
   ```

2. **Start backend:**

   ```sh
   npm run dev
   ```

---

### 🖥️ Frontend Only

1. **Install dependencies:**

   ```sh
   cd frontend
   npm install
   ```

2. **Start frontend:**

   ```sh
   npm run dev
   ```

## 🛠️ Tech Stack

This project uses the following technologies:

- **Frontend:**
  - [React](https://react.dev/) (with [Vite](https://vitejs.dev/) for fast development)
  - [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
  - [shadcn/ui](https://ui.shadcn.com/) for accessible, customizable React UI components built on top of Radix UI and Tailwind CSS
- **Backend:**
  - [Express.js](https://expressjs.com/) for building RESTful APIs
  - [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/) for data modeling
  - [JWT](https://jwt.io/) for authentication
- **Tooling & Dev Experience:**
  - [Nodemon](https://nodemon.io/) for backend auto-reload
  - [Concurrently](https://www.npmjs.com/package/concurrently) to run frontend and backend together
  - [dotenv](https://www.npmjs.com/package/dotenv) for environment variable management

**UI Library:**  
The app uses [shadcn/ui](https://ui.shadcn.com/) for a modern, accessible, and customizable component library, making it easy to build a beautiful and consistent user interface with Tailwind CSS.

---

## 🧑‍💻 Usage

- Open [http://localhost:5173](http://localhost:5173) in your browser.
- Register a new account or Login and start managing your tasks!
- 🖱️ **Drag and drop tasks between columns on the board to update their status.**

## 🗂️ Project Structure

```
todo-app/
├── backend/                        # Express API backend
│   ├── config/                     # Database connection config
│   │   └── dbConnection.js
│   ├── controllers/                # Route controllers (business logic)
│   │   ├── columnController.js
│   │   ├── taskController.js
│   │   └── userController.js
│   ├── middleware/                 # Express middleware (auth, error handling, etc.)
│   │   ├── errorHandler.js
│   │   └── validateTokenHandler.js
│   ├── models/                     # Mongoose models (User, Task, Column)
│   │   ├── columnModel.js
│   │   ├── taskModel.js
│   │   └── userModel.js
│   ├── routes/                     # Express route definitions
│   │   ├── columnRoutes.js
│   │   ├── taskRoutes.js
│   │   └── userRoutes.js
│   ├── constants.js                # App-wide constants
│   ├── server.js                   # Backend entry point
│   └── .env.example                # Example environment variables
│
├── frontend/                       # React frontend
│   ├── public/                     # Static assets (favicon, SVGs, etc.)
│   │   ├── task-list.svg
│   │   └── vite.svg
│   ├── src/
│   │   ├── assets/                 # Images, icons, etc.
│   │   ├── components/             # Reusable React components
│   │   ├── pages/                  # Page-level React components
│   │   ├── services/               # API service functions (e.g., api.js)
│   │   ├── index.css               # CSS/Tailwind styles
│   │   ├── App.jsx                 # Main app component
│   │   └── main.jsx                # React entry point
│   ├── .env                        # Frontend environment variables
│   ├── .env.example                # Example frontend environment variables
│   ├── package.json                # Frontend dependencies and scripts
│   ├── tailwind.config.js          # Tailwind CSS config
│   ├── postcss.config.js           # PostCSS config
│   ├── vite.config.js              # Vite config
│   ├── jsconfig.json               # JS path aliases
│   └── README.md                   # (Optional) Frontend-specific docs
│
├── .env.example                    # Example root environment variables
├── .env                            # Root environment variables (not committed)
├── .gitignore                      # Git ignore rules
├── package.json                    # Root scripts and dependencies
├── package-lock.json               # Lockfile
└── README.md                       # Project documentation (this file)
```

- **backend/**: All server-side code (API, models, controllers, middleware, etc.)
- **frontend/**: All client-side code (React components, pages, styles, etc.)
- **README.md**: Project documentation and instructions
- **.env / .env.example**: Environment variable files (never commit `.env` with secrets)

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
