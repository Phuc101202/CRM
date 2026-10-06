<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-v24-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-4.x-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Gemini_AI-2.5_Flash-4285F4?style=for-the-badge&logo=google&logoColor=white" />
</p>

<h1 align="center">⚡ SaaS CRM — AI-Powered Dashboard</h1>

<p align="center">
  A modern, full-stack CRM application featuring an intelligent backend and a highly interactive React frontend.<br/>
  Designed for scalability with Kanban-style pipeline management, dynamic charts, and Google Gemini AI integration.
</p>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Architecture & Tech Stack](#-architecture--tech-stack)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
- [Roadmap](#-roadmap)

---

## 🔍 Overview

This project is a complete **SaaS CRM solution** consisting of two main components:
1. **Frontend**: A lightning-fast Vite + React SPA with Kanban drag-and-drop (`dnd-kit`), data visualization (`recharts`), and utility-first styling (`tailwindcss`).
2. **Backend**: A robust Express REST API connected to MongoDB Atlas, implementing JWT-based authentication, structured data models (Leads, Contacts, Tasks), and AI-driven insights via Google Gemini.

---

## 🛠 Architecture & Tech Stack

### Frontend (`/frontend`)
- **Framework**: React 19 + Vite
- **Routing**: React Router v7
- **Styling**: Tailwind CSS v4 + `clsx` / `tailwind-merge`
- **Drag & Drop**: `@dnd-kit` for Kanban pipeline
- **Charts & Data**: `recharts` for analytics dashboards
- **Forms & Fetching**: `react-hook-form`, `axios`
- **UI Components**: `lucide-react` for iconography, `sonner` for toast notifications

### Backend (`/backend`)
- **Runtime**: Node.js v24 (ESM `"type": "module"`)
- **Framework**: Express.js 4.x
- **Database**: MongoDB Atlas (Mongoose ODM)
- **Security & Auth**: JSON Web Token (JWT) + `bcryptjs`
- **AI Integration**: Google Gemini API (`@google/genai`) for lead summaries and risk scoring

---

## ✨ Features

- **🔐 Secure Authentication**: JWT-based login/register flow with encrypted passwords.
- **📊 Interactive Dashboard**: Visual analytics and metrics tracking.
- **🚀 Kanban Pipeline**: Drag-and-drop lead management to visually move deals across stages (New → Qualified → Proposal → Won/Lost).
- **🤖 AI Insights**: Smart lead summarization and conversion risk scoring powered by Google Gemini 2.5 Flash.
- **👥 Contact & Task Management**: Easily track interactions, linked tasks, and notes per client.
- **📱 Responsive UI**: Beautifully designed interface adaptable to different screen sizes.

---

## 📁 Project Structure

```
crm-saas/
├── backend/                     # Express API Server
│   ├── config/                  # MongoDB config
│   ├── controllers/             # Business logic (Auth, Leads, etc.)
│   ├── middleware/              # JWT protect, Error handling
│   ├── models/                  # Mongoose Schemas (User, Lead, Contact...)
│   ├── routes/                  # Express Router definitions
│   ├── utils/                   # Helpers (generateToken, asyncHandler)
│   ├── .env.example             # Backend ENV template
│   └── server.js                # Backend Entry Point
│
├── frontend/                    # React + Vite Application
│   ├── public/                  # Static assets
│   ├── src/                     # React source code
│   │   ├── components/          # Reusable UI components
│   │   ├── pages/               # Application views/pages
│   │   ├── context/             # Global state (Auth, Theme)
│   │   ├── services/            # API/Axios calls
│   │   ├── utils/               # Formatters, helpers
│   │   ├── App.jsx              # Root component & Routing
│   │   └── main.jsx             # Frontend Entry Point
│   ├── .env.example             # Frontend ENV template
│   ├── tailwind.config.js       # Tailwind theme configuration
│   └── vite.config.js           # Vite bundler config
│
└── README.md                    # Project Documentation
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** >= 18
- **MongoDB Atlas** account (or local MongoDB)
- **Google Gemini API Key**

---

### Backend Setup

1. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Configure Environment Variables**:
   ```bash
   cp .env.example .env
   ```
   *Edit `.env` and fill in your `MONGO_URI`, `JWT_SECRET`, and `GEMINI_API_KEY`.*
4. **Start the development server**:
   ```bash
   npm run dev
   ```
   *The backend will run on `http://localhost:8000`.*

---

### Frontend Setup

1. **Open a new terminal and navigate to the frontend directory**:
   ```bash
   cd frontend
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Configure Environment Variables**:
   ```bash
   cp .env.example .env
   ```
   *Edit `.env` to point `VITE_API_URL` to your backend (e.g., `http://localhost:8000/api`).*
4. **Start the development server**:
   ```bash
   npm run dev
   ```
   *The frontend will run on `http://localhost:5173`.*

---

## 🔑 Environment Variables

### Backend (`backend/.env`)
```env
PORT=8000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# MongoDB Connection
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/
# Note: If experiencing ECONNREFUSED with Vietnamese ISPs, use standard direct URI instead of SRV

# Authentication
JWT_SECRET=your_super_secret_key_min_32_chars
JWT_EXPIRES_IN=7d

# Google Gemini AI
GEMINI_API_KEY=your_google_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash
```

### Frontend (`frontend/.env`)
```env
VITE_API_URL=http://localhost:8000/api
```

---

## 📡 API Reference (Backend)

| Category | Method | Endpoint | Auth | Description |
|----------|--------|----------|------|-------------|
| **Auth** | `POST` | `/api/auth/register` | ❌ | Create new account |
| **Auth** | `POST` | `/api/auth/login` | ❌ | Login, get JWT token |
| **Auth** | `GET` | `/api/auth/me` | ✅ | Get current user profile |
| **Auth** | `PUT` | `/api/auth/profile` | ✅ | Update profile info |
| **Leads** | `GET` | `/api/leads` | ✅ | Get leads (supports search, filters) |
| **Leads** | `POST` | `/api/leads` | ✅ | Create a new lead |
| **Leads** | `PUT` | `/api/leads/:id` | ✅ | Update lead details |
| **Leads** | `POST` | `/api/leads/reorder` | ✅ | Batch update `order` for Kanban |
| **System**| `GET` | `/api/health` | ❌ | Health check |

---

## 🗺 Roadmap

- [x] Backend Express API setup (Auth, Leads, DB Models)
- [x] Frontend React + Vite boilerplate setup (Tailwind, Routing)
- [x] Integrate Frontend Auth state with Backend JWT
- [x] Implement Kanban Drag-and-Drop for Leads
- [ ] Implement Dashboard Charts (Revenue, Lead Conversion)
- [ ] Connect Gemini AI for Lead Summarization & Scoring
- [ ] CRUD interfaces for Contacts and Tasks
- [ ] Production Deployment (Docker / Vercel / Render)

---

## 👤 Author

**Phuc Lam** — [GitHub](https://github.com/lamminhphuc1012)

<p align="center">Built with ❤️ — SaaS CRM powered by AI</p>
