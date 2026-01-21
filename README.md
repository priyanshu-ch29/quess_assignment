# HRMS Lite - Human Resource Management System

A lightweight, full-stack web application for managing employee records and tracking daily attendance.

## 🚀 Live Demo

- **Frontend URL**: https://quess-assignment.vercel.app
- **Backend API**: https://quess-assignment.onrender.com
- **API Documentation**: https://quess-assignment.onrender.com/docs

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Local Setup](#local-setup)
- [API Documentation](#api-documentation)
- [Assumptions & Limitations](#assumptions--limitations)

## ✨ Features

### Employee Management

- ✅ Add new employees with validation
- ✅ View all employees in a searchable table
- ✅ Delete employees with confirmation
- ✅ Auto-generated unique Employee IDs
- ✅ Email validation and duplicate prevention

### Attendance Management

- ✅ Mark daily attendance (Present/Absent)
- ✅ View attendance history per employee
- ✅ Prevent duplicate attendance for same date
- ✅ Date-based attendance tracking

### UI/UX

- ✅ Modern, professional design with Tailwind CSS
- ✅ Responsive layout (mobile, tablet, desktop)
- ✅ Loading states for async operations
- ✅ Empty states with helpful messages
- ✅ Error handling with user-friendly messages
- ✅ Form validation with inline error display

## 🛠️ Tech Stack

### Frontend

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Font**: Inter (Google Fonts)

### Backend

- **Framework**: FastAPI (Python)
- **Database**: MongoDB (with Motor async driver)
- **Validation**: Pydantic
- **Server**: Uvicorn

### Deployment

- **Frontend**: Vercel
- **Backend**: Render
- **Database**: MongoDB Atlas (Free Tier)

## 📁 Project Structure

```
QuessCorpAssignment/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js     # API configuration
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── ErrorMessage.jsx
│   │   │   └── EmptyState.jsx
│   │   ├── pages/
│   │   │   ├── Employees.jsx
│   │   │   └── Attendance.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── tailwind.config.js
│   ├── package.json
│   └── vite.config.js
│
├── backend/                  # FastAPI backend application
│   ├── routes/
│   │   ├── employees.py     # Employee endpoints
│   │   └── attendance.py    # Attendance endpoints
│   ├── main.py              # FastAPI app entry point
│   ├── database.py          # MongoDB connection
│   ├── models.py            # Pydantic models
│   ├── requirements.txt
│   └── .env.example
│
└── README.md
```

## 🚀 Local Setup

### Prerequisites

- **Node.js** (v18 or higher)
- **Python** (v3.9 or higher)
- **MongoDB** (local installation or MongoDB Atlas account)

### Backend Setup

1. **Navigate to backend directory**:

   ```bash
   cd backend
   ```

2. **Create virtual environment**:

   ```bash
   python -m venv venv
   ```

3. **Activate virtual environment**:
   - Windows:
     ```bash
     venv\Scripts\activate
     ```
   - macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

4. **Install dependencies**:

   ```bash
   pip install -r requirements.txt
   ```

5. **Set up environment variables**:
   - Copy `.env.example` to `.env`:
     ```bash
     copy .env.example .env
     ```
   - Update `MONGODB_URL` in `.env`:
     - For local MongoDB: `mongodb://localhost:27017`
     - For MongoDB Atlas: `mongodb+srv://username:password@cluster.mongodb.net/`

6. **Run the backend server**:

   ```bash
   uvicorn main:app --reload
   ```

   - Server will start at: `http://localhost:8000`
   - API docs available at: `http://localhost:8000/docs`

### Frontend Setup

1. **Navigate to frontend directory**:

   ```bash
   cd frontend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Create environment file** (optional):
   - Create `.env` file in frontend directory:
     ```
     VITE_API_URL=http://localhost:8000
     ```

4. **Run the development server**:

   ```bash
   npm run dev
   ```

   - Application will start at: `http://localhost:5173`

### MongoDB Setup

#### Option 1: Local MongoDB

1. Install MongoDB Community Edition
2. Start MongoDB service
3. Database will be created automatically on first run

#### Option 2: MongoDB Atlas (Recommended)

1. Create free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier)
3. Create database user with password
4. Whitelist your IP address (or use 0.0.0.0/0 for development)
5. Get connection string and update `.env` file

## 📚 API Documentation

### Base URL

```
http://localhost:8000
```

### Endpoints

#### Employees

**Create Employee**

```http
POST /api/employees
Content-Type: application/json

{
  "full_name": "John Doe",
  "email": "john.doe@company.com",
  "department": "Engineering"
}

Response: 201 Created
{
  "employee_id": "EMP1234",
  "full_name": "John Doe",
  "email": "john.doe@company.com",
  "department": "Engineering"
}
```

**Get All Employees**

```http
GET /api/employees

Response: 200 OK
[
  {
    "employee_id": "EMP1234",
    "full_name": "John Doe",
    "email": "john.doe@company.com",
    "department": "Engineering"
  }
]
```

**Delete Employee**

```http
DELETE /api/employees/{employee_id}

Response: 204 No Content
```

#### Attendance

**Mark Attendance**

```http
POST /api/attendance
Content-Type: application/json

{
  "employee_id": "EMP1234",
  "date": "2026-01-21",
  "status": "Present"
}

Response: 201 Created
{
  "employee_id": "EMP1234",
  "date": "2026-01-21",
  "status": "Present"
}
```

**Get Employee Attendance**

```http
GET /api/attendance/{employee_id}

Response: 200 OK
[
  {
    "employee_id": "EMP1234",
    "date": "2026-01-21",
    "status": "Present"
  }
]
```

### Error Responses

All endpoints return appropriate HTTP status codes:

- `400 Bad Request` - Validation errors, duplicates
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server errors

Error response format:

```json
{
  "detail": "Error message description"
}
```

## 📝 Assumptions & Limitations

### Assumptions

- **Single Admin User**: No authentication or user management required
- **Employee ID**: Auto-generated (format: EMP + 4 random digits) to ensure uniqueness
- **Attendance**: Can only be marked once per employee per day
- **Date Format**: All dates stored in ISO format (YYYY-MM-DD)
- **Departments**: Free-text field, no predefined list
- **Timezone**: All dates are in local timezone

### Limitations

- **No Authentication**: Anyone can access and modify data
- **No Edit Functionality**: Employees and attendance cannot be edited after creation
- **No Bulk Operations**: No bulk import/export of data
- **No Advanced Filtering**: Limited search/filter capabilities
- **No Reporting**: No analytics or reporting features
- **No Leave Management**: Only tracks present/absent status
- **No Payroll**: No salary or payment tracking
- **No Role Management**: No different user roles or permissions

### Future Enhancements (Out of Scope)

- User authentication and authorization
- Employee profile editing
- Advanced reporting and analytics
- Leave management system
- Payroll integration
- Department management
- Bulk data import/export
- Email notifications
- Audit logs

## 👨‍💻 Development

### Running Tests

```bash
# Backend tests (if implemented)
cd backend
pytest

# Frontend tests (if implemented)
cd frontend
npm test
```

### Building for Production

**Frontend**:

```bash
cd frontend
npm run build
```

**Backend**:
Backend runs directly with uvicorn, no build step required.

---

**Note**: This is a lightweight HRMS system built for demonstration purposes. For production use, additional features like authentication, authorization, data backup, and security measures should be implemented.
