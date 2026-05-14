# Authentication & Authorization System

## Introduction
This project implements a secure Authentication and Authorization System for a learning platform using Node.js, Express.js, MongoDB, JWT, and bcrypt. The system ensures that only authenticated users can access protected resources and users can perform actions based on their assigned roles.

The application supports two roles:
- Admin
- Student
Admins have full access to manage users and view data, while students have limited access to their own profile and information.

## Objective
The objective of this project is to:
- Implement secure user authentication
- Encrypt passwords using bcrypt
- Generate JWT tokens for login
- Protect API routes
- Implement role-based authorization
- Restrict access based on user roles

## Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- bcryptjs
- dotenv
- CORS
- Postman

## Project Structure
```bash
auth-system/
│
├── config/
│   └── db.js
│
├── controllers/
│   └── authController.js
│
├── middleware/
│   ├── authMiddleware.js
│   └── roleMiddleware.js
│
├── models/
│   └── User.js
│
├── routes/
│   └── authRoutes.js
│
├── .env
├── package.json
├── server.js
└── README.md
