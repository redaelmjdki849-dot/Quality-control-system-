# Installation Guide

## System Requirements

- **Node.js**: v14.0 or higher
- **npm**: v6.0 or higher (or yarn)
- **MongoDB**: v4.0 or higher
- **RAM**: 2GB minimum
- **Disk Space**: 500MB minimum

## Step-by-Step Installation

### 1. Clone the Repository

```bash
git clone https://github.com/redaelmjdki849-dot/Quality-control-system-.git
cd Quality-control-system-
```

### 2. Backend Installation

```bash
cd backend

# Install dependencies
npm install

# Copy environment template
cp .env.example .env
```

**Edit `.env` file**:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/quality-control
JWT_SECRET=your-secret-key-here-change-in-production
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

**Seed demo data**:
```bash
npm run seed
```

**Start backend**:
```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### 3. Frontend Installation

```bash
cd ../frontend

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local
```

**Edit `.env.local` file**:
```env
VITE_API_URL=http://localhost:5000/api
VITE_ENV=development
```

**Start frontend**:
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

### 4. Access the Application

1. Open your browser
2. Navigate to: `http://localhost:5173`
3. Use demo credentials:
   - Email: `admin@qssr.com`
   - Password: `password123`

## MongoDB Setup

### Local MongoDB

**Windows**:
```bash
# Download MongoDB Community Server from mongodb.com
# Install and start MongoDB service
mongod
```

**macOS** (with Homebrew):
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux** (Ubuntu/Debian):
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
sudo apt-get update
sudo apt-get install mongodb-org
sudo systemctl start mongod
```

### MongoDB Atlas (Cloud)

1. Create account at [mongodb.com](https://www.mongodb.com)
2. Create a cluster
3. Get connection string
4. Update `MONGODB_URI` in backend `.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/quality-control?retryWrites=true&w=majority
```

## Running Both Services Simultaneously

### Option 1: Two Terminal Windows

**Terminal 1**:
```bash
cd backend
npm run dev
```

**Terminal 2**:
```bash
cd frontend
npm run dev
```

### Option 2: Using npm-run-all

From root directory:
```bash
npm install -g npm-run-all

# In root package.json, use:
npm-run-all --parallel backend-dev frontend-dev
```

## Production Deployment

### Backend Deployment (Heroku Example)

```bash
# Install Heroku CLI
# Login to Heroku
heroku login

# Create app
heroku create quality-control-api

# Add MongoDB
heroku addons:create mongolab:sandbox

# Deploy
git push heroku main
```

### Frontend Deployment (Vercel Example)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel
```

## Troubleshooting

### MongoDB Connection Issues

```bash
# Test MongoDB connection
mongo
# Should connect to MongoDB shell
```

### Port Already in Use

```bash
# Kill process on port 5000 (backend)
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:5000 | xargs kill -9
```

### Dependencies Issues

```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Frontend Won't Connect to Backend

1. Verify backend is running on port 5000
2. Check VITE_API_URL in .env.local
3. Check browser console for CORS errors
4. Verify MongoDB is connected

## Demo User Roles

| Email | Password | Role |
|-------|----------|------|
| admin@qssr.com | password123 | Admin |
| manager@qssr.com | password123 | Manager |
| hr@qssr.com | password123 | HR |
| supervisor@qssr.com | password123 | Supervisor |
| team_leader@qssr.com | password123 | Team Leader |
| employee@qssr.com | password123 | Employee |

## Next Steps

1. ✅ Access the dashboard
2. ✅ Test all modules (Attendance, Transport)
3. ✅ Export data (PDF, CSV)
4. ✅ Customize branding colors if needed
5. ✅ Deploy to production

## Support

For issues or questions:
1. Check GitHub Issues
2. Review documentation
3. Contact development team

---

**Happy Coding!** 🚀
