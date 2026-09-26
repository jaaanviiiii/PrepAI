# PrepAI – AI Interview Preparation Platform 🚀

PrepAI is an AI-powered full-stack platform designed to help students and job seekers master technical and HR interviews with adaptive mock drills, practice banks, performance analytics, and dynamic study roadmaps.

---

## 🔑 Demo Credentials

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@prepai.com` | `Admin@123` |
| **Student** | `student@prepai.com` | `Student@123` |

---

## 🌟 Core Features

- 🤖 **AI Mock Interviews**: Adaptive step-by-step interview sessions with speech synthesis audio, timer, and instant multi-category evaluation reports.
- 📚 **Question Bank**: 500+ model solutions across 13 technical & HR categories with difficulty filters and explanations.
- 🗺️ **Personalized Study Roadmap**: 4-week AI preparation plan tailored to your target role and weak areas.
- 📊 **Performance Analytics**: Visual charts tracking accuracy, score timeline, and topic breakdown.
- 🔖 **Bookmarks & History**: Full audit trail of past mock interviews and saved question collections.
- 🛡️ **Admin Portal**: User account management, question CRUD operations, and platform statistics.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS, Recharts, Lucide Icons, React Router DOM
- **Backend**: Node.js, Express.js, JWT Authentication, bcryptjs
- **Database**: MongoDB & Mongoose *(with auto MongoMemoryServer fallback for zero-config run)*

---

## ⚡ Quick Start

### 1. Backend Server
```bash
cd server
npm install
npm run seed   # Seed sample questions & demo accounts
npm start      # Running on http://localhost:5000
```

### 2. Frontend Client
```bash
cd client
npm install
npm run dev    # Running on http://localhost:3000
```
