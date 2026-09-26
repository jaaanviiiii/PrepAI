# PrepAI – AI Interview Preparation Platform 🚀

PrepAI is a complete, modern, responsive full-stack SaaS web application designed to help B.Tech students and tech job seekers prepare for technical and HR interviews through personalized practice, AI-powered mock interviews, question banks, performance analytics, and dynamic AI-generated study roadmaps.

---

## 🌟 Key Features

### 👤 Student / Candidate Role
- **Authentication**: JWT authentication with password hashing (bcrypt), persistent logins, and protected routing.
- **User Profile**: Customize target job role, experience level, technical skills, programming languages, and interview preferences.
- **User Dashboard**: Overview of practice metrics, streak tracking, Recharts category performance radar, recent activity, and AI focus recommendations.
- **Question Bank**: Over 500+ model solutions across 13 technical & HR categories with difficulty filters, model answer reveals, explanations, and bookmarking.
- **AI Mock Interview Simulator**:
  - Configurable setup (Role, Technical/HR/Mixed, Difficulty, Question Count).
  - Real-time adaptive step-by-step interview experience with speech synthesis audio option, live timer, and response word count tracking.
- **AI Feedback & Evaluation Report**:
  - Overall score out of 100 with pass/fail indicator.
  - Category breakdown scores (Technical Knowledge, Problem Solving, Communication, Confidence).
  - Key Insights: What you did well, Areas to improve, Missing concepts, Suggested focus topics.
  - AI Sample Improved Answer with side-by-side comparison.
- **Personalized Study Roadmap**: 4-week AI preparation schedule customized to your target role and weak areas with interactive task completion tracking.
- **Analytics Dashboard**: Line charts tracking score improvement over time, topic performance bar charts, and category distribution pie charts.
- **Interview History & Bookmarks**: Full audit log of past interviews with clickable AI evaluation reports and saved question collection.

### 🛡️ Admin Role
- **Admin Dashboard**: Overview metrics (Total Users, Active Users, Question Bank Size, Total Interviews, Avg Platform Score).
- **User Management**: View registered candidates, inspect roles, and delete accounts.
- **Question Bank CRUD**: Create, edit, search, filter, and delete questions with model answers, explanations, and tags.
- **Category & System Auditing**: Monitor category statistics and review user-flagged questions.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React.js 19 + Vite 6
- **Styling**: Tailwind CSS v4 + Vanilla CSS Glassmorphism
- **Routing**: React Router DOM v7
- **HTTP Client**: Axios with Bearer token interceptor
- **Charts**: Recharts
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js v26 + Express.js
- **Database**: MongoDB + Mongoose (with automatic MongoMemoryServer fallback for zero-config local run)
- **Security**: JWT (jsonwebtoken) & Password Hashing (bcryptjs)
- **AI Integration**: AI Service Layer with realistic adaptive evaluation engine & REST API hook.

---

## 🔑 Demo Credentials

| Role | Email | Password |
| :--- | :--- | :--- |
| **Demo Admin** | `admin@prepai.com` | `Admin@123` |
| **Demo Student** | `student@prepai.com` | `Student@123` |

> *Tip: You can also use the One-Click Demo buttons on the Login page!*

---

## ⚙️ Installation & Setup Guide

### 1. Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### 2. Clone / Workspace Setup
Navigate to the project root directory:
```bash
cd PrepAi
```

### 3. Backend Setup
```bash
cd server
npm install
npm run seed     # Seed database with demo admin, student, and questions
npm start        # Starts server on http://localhost:5000
```
*Note: If local MongoDB is not running on `mongodb://127.0.0.1:27017/prepai`, the backend automatically launches an in-memory MongoDB instance (`MongoMemoryServer`) seamlessly!*

### 4. Frontend Setup
In a new terminal window:
```bash
cd client
npm install
npm run dev      # Starts Vite dev server on http://localhost:3000
```

---

## 🌐 Environment Variables

### Server (`server/.env`)
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/prepai
JWT_SECRET=prepai_super_secret_jwt_key_2026
AI_API_KEY=
```

---

## 📡 REST API Architecture Overview

### Auth
- `POST /api/auth/register` - Candidate registration
- `POST /api/auth/login` - User/Admin sign in
- `GET /api/auth/me` - Token validation

### User & Profile
- `GET /api/users/profile` - Fetch current profile
- `PUT /api/users/profile` - Update candidate details
- `GET /api/users/stats` - Fetch candidate statistics

### Questions & Bookmarks
- `GET /api/questions` - Search & filter question bank
- `POST /api/questions` - (Admin) Create question
- `PUT /api/questions/:id` - (Admin) Update question
- `DELETE /api/questions/:id` - (Admin) Delete question
- `GET /api/bookmarks` - Saved question collection
- `POST /api/bookmarks` - Bookmark question

### AI Mock Interview & Roadmap
- `POST /api/interviews/start` - Initialize AI mock session
- `POST /api/interviews/:id/answer` - Save question answer progress
- `POST /api/interviews/:id/complete` - Trigger full AI evaluation
- `GET /api/interviews/history` - Fetch candidate interview history
- `GET /api/roadmap` - Fetch/Generate preparation roadmap
- `PUT /api/roadmap/:id/task` - Toggle roadmap task completion

### Admin
- `GET /api/admin/users` - List all candidate accounts
- `DELETE /api/admin/users/:id` - Remove user account
- `GET /api/admin/statistics` - Platform analytics & metrics

---

## 🔮 Future Scope
1. **Real-time Video & Audio Stream Speech Analysis**: Wasm-based filler word detection (`"um"`, `"like"`, `"you know"`).
2. **Peer-to-Peer Mock Interviews**: Peer matching room via WebRTC for collaborative practice.
3. **Company-Specific Question Filters**: Dedicated tracks for FAANG/MAMAA and top tech startups.
