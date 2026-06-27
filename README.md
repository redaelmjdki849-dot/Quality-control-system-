# QSSR - Quality Control System Dashboard

## 📋 Overview

A modern, professional dashboard for **Quality Solutions Sorting And Rework (QSSR)** that provides comprehensive management of employee attendance, transport operations, and quality control metrics.

### 🎯 Key Features

#### Module 1: Employee Attendance Management
- **Modern Attendance Interface** with professional card-based design
- **Fields**: Date, Employee Name, ID, Team, Workplace, Check In/Out, Total Hours, Feedback
- **Search & Filter**: By name, ID, team, workplace, date range
- **Color Tagging**: Assign custom colors to employees for visual identification
- **Export Options**: PDF, CSV, Print
- **Statistics Dashboard**: Total employees, present/absent today, total hours, overtime
- **Pagination & Sorting**: Full table controls
- **Responsive Design**: Works on mobile, tablet, and desktop

#### Module 2: Transport Attendance
- **Dedicated Transport Management** page
- **Fields**: Date, Transport Name, Place, Check In/Out, Target Hours, Notes
- **Filtering**: By month and year
- **Export**: PDF and CSV reports
- **Statistics**: Total records, total hours, monthly trends

#### Module 3: Modern Dashboard Homepage
- **KPI Cards**: Active employees, teams, attendance rate, working hours, transport records
- **Charts**: Monthly attendance trends, team performance, working hours analysis
- **Recent Activities**: Latest check-ins and operations
- **Professional SaaS-style design** with enterprise look

### 🔒 Security Features

- **Role-Based Access Control (RBAC)**
  - Admin: Full system access
  - Manager: Manage teams and attendance
  - HR: Employee and records management
  - Supervisor: Team oversight
  - Team Leader: Team monitoring
  - Employee: View own records

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: BCrypt encryption
- **Protected Routes**: Middleware-based access control

### 🎨 Design

- **QSSR Branding Colors**:
  - Primary Blue: `#1E3A8A`
  - Accent Orange: `#F97316`
  - Clean White: `#FFFFFF`

- **Technology Stack**:
  - Frontend: React + Vite + Tailwind CSS + Zustand
  - Backend: Node.js + Express + MongoDB
  - UI Components: Lucide React Icons
  - Export: jsPDF + PapaParse
  - Charts: Chart.js + react-chartjs-2

### 📦 Installation

#### Prerequisites
- Node.js >= 14.0
- MongoDB >= 4.0
- npm or yarn

#### Setup

1. **Clone the repository**
```bash
git clone https://github.com/redaelmjdki849-dot/Quality-control-system-.git
cd Quality-control-system-
```

2. **Backend Setup**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm run seed  # Seed demo data
npm run dev   # Start development server
```

3. **Frontend Setup**
```bash
cd frontend
npm install
cp .env.example .env.local
# Edit .env.local with your API URL
npm run dev   # Start development server
```

### 🚀 Running the Application

**Backend** (Port 5000):
```bash
cd backend
npm run dev
```

**Frontend** (Port 3000/5173):
```bash
cd frontend
npm run dev
```

### 📝 Demo Credentials

```
Email: admin@qssr.com
Password: password123
```

Other demo users:
- manager@qssr.com
- hr@qssr.com
- supervisor@qssr.com
- team_leader@qssr.com
- employee@qssr.com

(All with password: password123)

### 📚 API Documentation

#### Authentication
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/register` - Create new user (Admin only)

#### Attendance
- `GET /api/attendance` - Get all records (with filters)
- `POST /api/attendance` - Create record
- `PUT /api/attendance/:id` - Update record
- `DELETE /api/attendance/:id` - Delete record

#### Transport
- `GET /api/transport` - Get all transport records
- `POST /api/transport` - Create transport record
- `PUT /api/transport/:id` - Update record
- `DELETE /api/transport/:id` - Delete record

#### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics
- `GET /api/dashboard/attendance-trend` - Get attendance trends

#### Users
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/:id` - Get user details
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user (Admin only)

### 📁 Project Structure

```
quality-control-system/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Attendance.js
│   │   └── Transport.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── attendance.js
│   │   ├── transport.js
│   │   ├── dashboard.js
│   │   └── users.js
│   ├── middleware/
│   │   └── auth.js
│   ├── scripts/
│   │   └── seed.js
│   ├── server.js
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Attendance.jsx
│   │   │   ├── Transport.jsx
│   │   │   └── Login.jsx
│   │   ├── components/
│   │   │   ├── Layout.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── Header.jsx
│   │   ├── stores/
│   │   │   ├── authStore.js
│   │   │   └── attendanceStore.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── .env.example
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
├── README.md
├── INSTALLATION.md
└── LICENSE
```

### 🛠️ Development

#### Adding New Features

1. Create a new route in `backend/routes/`
2. Add corresponding models if needed
3. Create frontend page in `frontend/src/pages/`
4. Add store/state management in `frontend/src/stores/`
5. Test with demo credentials

#### Running Tests
```bash
cd backend
npm test
```

### 📊 Database Schema

#### User
- name, email, password (hashed)
- role (admin, manager, hr, supervisor, team_leader, employee)
- department, position, phone
- isActive, createdAt, updatedAt

#### Attendance
- date, employeeId, employeeName
- team, workplace
- checkIn, checkOut, totalHours
- color, feedback, isOvertime
- recordedBy, createdAt, updatedAt

#### Transport
- date, transportName, place
- checkIn, checkOut, totalHours
- targetHours, status (pending, active, completed, delayed)
- notes, recordedBy, createdAt, updatedAt

### 🐛 Troubleshooting

**Backend won't start**
- Check MongoDB is running
- Verify .env file is configured
- Check port 5000 is available

**Frontend won't connect to backend**
- Verify backend is running on port 5000
- Check VITE_API_URL in .env.local
- Check CORS is enabled

**Login fails**
- Ensure seed script was run
- Check credentials (admin@qssr.com / password123)
- Verify MongoDB connection

### 📄 License

MIT License - See LICENSE file for details

### 👥 Support

For issues or questions, please contact the development team.

---

**Last Updated**: June 2026
**Version**: 1.0.0
**Status**: Production Ready ✅
