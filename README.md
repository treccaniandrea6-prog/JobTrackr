# 🚀 JobTrackr

JobTrackr is a full-stack web application designed to help users manage their job applications in a simple, organized and efficient way.

---

## 🌐 Live Demo

Frontend: https://joobtrackr.netlify.app  
Backend API: https://jobtrackr-backend-ctkm.onrender.com  

---

## 🧠 Project Overview

JobTrackr allows users to:

- Create an account and log in securely  
- Track job applications in one place  
- Add new job opportunities  
- Edit and update application details  
- Delete applications  
- Manage their job search pipeline  

This project was built as a complete full-stack application with real deployment and database integration.

---

## 🛠 Tech Stack

Frontend:
- React (Vite)
- JavaScript
- CSS

Backend:
- Node.js
- Express.js

Database:
- MySQL (Railway)

Deployment:
- Netlify (Frontend)
- Render (Backend)

---

## 🔐 Authentication

- JWT-based authentication  
- Protected routes  
- User-specific data access  

---

## ⚙️ Features

- User registration and login  
- Create job applications  
- View all applications  
- Edit application details  
- Delete applications  
- Persistent database storage  

---

## 🧩 Architecture

The application follows a client-server architecture:

- The frontend communicates with the backend through REST APIs  
- The backend handles authentication, business logic and database operations  
- The database stores users and job applications  

---

## 🧪 Testing

The following functionalities have been tested:

- Register / Login  
- CRUD operations on applications  
- Navigation between pages  
- Session handling  

---

## ⚠️ Known Issues

- Minor issue when editing an application with an empty date field  

---

## 📦 Installation (Local Setup)

1. Clone the repository  
git clone https://github.com/treccaniandrea6-prog/JobTrackr.git  
cd JobTrackr  

2. Backend setup  
cd backend  
npm install  
npm run dev  

3. Frontend setup  
cd frontend  
npm install  
npm run dev  

---

## 📌 Environment Variables

The backend requires the following environment variables:

DB_HOST=your_database_host  
DB_USER=your_database_user  
DB_PASSWORD=your_database_password  
DB_NAME=your_database_name  
JWT_SECRET=your_secret_key  
CLIENT_URL=your_frontend_url  

---

## 👨‍💻 Author

Andrea Treccani  

---

## 📄 License

This project is for educational purposes only.
