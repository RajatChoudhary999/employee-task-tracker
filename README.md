# Employee Task Tracker

A full-stack application that allows admins to manage employees and assign tasks, and allows employees to view and update their assigned task status.

---

## Tech Stack

### Backend
- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- JWT Authentication
- Role-based access control

### Frontend
- React (Vite)
- Tailwind CSS
- Material UI (MUI)
- Axios
- React Router

---

## Features

### Admin
- Login with JWT authentication
- View all employees
- Create and assign tasks to employees
- View all tasks with assigned employee details

### Employee
- Login with JWT authentication
- View assigned tasks
- Update task status (Pending → In Progress → Completed)

---

## Project Structure
Assignment/
├── backend/
├── frontend/
|── postman/
└── README.md

## Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone <repository-url>
cd Assignment

cd backend
npm install

Create a .env file inside the backend folder:
PORT=5000
JWT_SECRET=your_jwt_secret
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=testdb
DB_PORT=5432

## Frontend 
will run on: http://localhost:5173


## Database

PostgreSQL is used as the database

SQL schema is provided in:

backend/database/schema.sql


## API Documentation

A Postman collection is provided to test all APIs:

postman/employee-task-tracker.postman_collection.json

Import the collection into Postman and set the Authorization header with the JWT token after login.

