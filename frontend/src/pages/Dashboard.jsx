import React, { useEffect, useState } from 'react'
import { Users, UserCheck, UserX, Clock, TrendingUp } from 'lucide-react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

function Dashboard() {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    presentToday: 0,
    absentToday: 0,
    totalHoursToday: 0,
    overtimeHours: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardStats()
  }, [])

  const fetchDashboardStats = async () => {
    try {
      const response = await axios.get(`${API_URL}/dashboard/stats`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      setStats(response.data)
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const StatCard = ({ icon: Icon, label, value, color }) => (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium mb-2">{label}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="text-white" size={24} />
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          icon={Users}
          label="Total Employees"
          value={stats.totalEmployees}
          color="bg-blue-900"
        />
        <StatCard
          icon={UserCheck}
          label="Present Today"
          value={stats.presentToday}
          color="bg-green-500"
        />
        <StatCard
          icon={UserX}
          label="Absent Today"
          value={stats.absentToday}
          color="bg-red-500"
        />
        <StatCard
          icon={Clock}
          label="Total Hours"
          value={`${stats.totalHoursToday}h`}
          color="bg-orange-500"
        />
        <StatCard
          icon={TrendingUp}
          label="Overtime Hours"
          value={`${stats.overtimeHours}h`}
          color="bg-purple-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Monthly Attendance</h3>
          <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
            <p className="text-gray-500">Chart will be displayed here</p>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Team Performance</h3>
          <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
            <p className="text-gray-500">Chart will be displayed here</p>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activities</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-gray-700 font-semibold">Employee</th>
                <th className="px-4 py-2 text-left text-gray-700 font-semibold">Check In</th>
                <th className="px-4 py-2 text-left text-gray-700 font-semibold">Check Out</th>
                <th className="px-4 py-2 text-left text-gray-700 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td colSpan="4" className="px-4 py-4 text-center text-gray-500">
                  No recent activities
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard