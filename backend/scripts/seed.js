require('dotenv').config();

const mongoose = require('mongoose');
const User = require('./models/User');
const Attendance = require('./models/Attendance');
const Transport = require('./models/Transport');

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/quality-control');
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Attendance.deleteMany({});
    await Transport.deleteMany({});

    // Create users
    const users = await User.create([
      {
        name: 'Admin User',
        email: 'admin@qssr.com',
        password: 'password123',
        role: 'admin',
        department: 'Management',
        position: 'System Administrator'
      },
      {
        name: 'Ahmed Mohamed',
        email: 'ahmed@qssr.com',
        password: 'password123',
        role: 'manager',
        department: 'Quality Control',
        position: 'Quality Manager'
      },
      {
        name: 'Fatima Hassan',
        email: 'fatima@qssr.com',
        password: 'password123',
        role: 'hr',
        department: 'Human Resources',
        position: 'HR Manager'
      },
      {
        name: 'Mohammad Ali',
        email: 'mohammad@qssr.com',
        password: 'password123',
        role: 'supervisor',
        department: 'Operations',
        position: 'Supervisor'
      },
      {
        name: 'Youssef Ibrahim',
        email: 'youssef@qssr.com',
        password: 'password123',
        role: 'team_leader',
        department: 'Quality Control',
        position: 'Team Leader'
      },
      {
        name: 'Sara Ahmed',
        email: 'sara@qssr.com',
        password: 'password123',
        role: 'employee',
        department: 'Quality Control',
        position: 'Quality Inspector'
      }
    ]);

    // Create attendance records
    const attendance = await Attendance.create([
      {
        date: new Date(),
        employeeId: 'EMP001',
        employeeName: 'Ahmed Mohamed',
        team: 'Team A',
        workplace: 'Main Office',
        checkIn: '08:00',
        checkOut: '17:00',
        color: '#3B82F6',
        feedback: 'Regular attendance'
      },
      {
        date: new Date(),
        employeeId: 'EMP002',
        employeeName: 'Fatima Hassan',
        team: 'Team B',
        workplace: 'Main Office',
        checkIn: '08:30',
        checkOut: '17:30',
        color: '#F97316',
        feedback: 'Good attendance'
      },
      {
        date: new Date(),
        employeeId: 'EMP003',
        employeeName: 'Mohammad Ali',
        team: 'Team A',
        workplace: 'Warehouse',
        checkIn: '07:00',
        checkOut: '16:00',
        color: '#10B981',
        feedback: 'Early arrival'
      }
    ]);

    // Create transport records
    const transport = await Transport.create([
      {
        date: new Date(),
        transportName: 'Transport Van 1',
        place: 'Main Office',
        checkIn: '07:30',
        checkOut: '17:30',
        targetHours: 10,
        status: 'completed',
        notes: 'Regular route'
      },
      {
        date: new Date(),
        transportName: 'Transport Van 2',
        place: 'Warehouse',
        checkIn: '08:00',
        checkOut: '18:00',
        targetHours: 10,
        status: 'completed',
        notes: 'Normal operation'
      }
    ]);

    console.log('✅ Database seeded successfully!');
    console.log(`Created ${users.length} users`);
    console.log(`Created ${attendance.length} attendance records`);
    console.log(`Created ${transport.length} transport records`);
    
    console.log('\n📝 Demo Login Credentials:');
    console.log('Email: admin@qssr.com');
    console.log('Password: password123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();