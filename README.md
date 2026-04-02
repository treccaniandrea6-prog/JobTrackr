# JobTrackr – Job Application Management Platform

JobTrackr is a full-stack web application designed to help users track, manage, and organize their job applications in a clean, structured, and professional way.

---

## 🚀 Tech Stack

**Frontend**
- React (Vite)
- React Router
- Context API

**Backend**
- Node.js
- Express.js

**Database**
- MySQL

**Authentication**
- JWT (JSON Web Tokens)
- bcrypt (password hashing)

---

## ✨ Features

### 🔐 Authentication
- User registration
- User login
- JWT-based authentication
- Protected routes

### 👤 User
- View profile
- Update profile
- Secure session handling

### 📊 Job Applications
- Create job applications
- View all applications (user-specific)
- Edit applications
- Delete applications

### 🔍 Advanced Features
- Filter by application status
- Search by company or role
- Clean and structured dashboard

---

## 🧠 Application Structure

### Backend (REST API)
- /api/auth
- /api/users
- /api/applications

### Database Tables

**users**
- id
- name
- email
- password
- created_at
- updated_at

**applications**
- id
- user_id
- company_name
- role_title
- location
- status
- application_date
- job_link
- notes
- created_at
- updated_at

---

## 🌐 Live Demo

Frontend: (add Netlify link here)  
Backend: (add Render link here)

---

## ⚙️ Installation

### Clone the repository
git clone https://github.com/YOUR_USERNAME/JobTrackr.git  
cd JobTrackr

### Backend setup
cd backend  
npm install  
npm run dev  

### Frontend setup
cd frontend  
npm install  
npm run dev  

---

## 🔐 Environment Variables

Create a `.env` file inside `/backend`:

PORT=5001  
DB_HOST=localhost  
DB_USER=root  
DB_PASSWORD=your_password  
DB_NAME=jobtrackr  
JWT_SECRET=your_secret_key  

---

## 📌 Notes

- This project was built as a final project for a Full Stack Master.
- Focus on clean architecture, authentication, and user experience.
- Designed to simulate a real-world SaaS product.

---

## 👨‍💻 Author

Andrea Treccani
