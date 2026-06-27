import React, { useState, useEffect } from 'react'
import { Search, Download, Printer, Plus, Filter } from 'lucide-react'
import axios from 'axios'
import jsPDF from 'jspdf'
import Papa from 'papaparse'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

function Attendance() {
  const [records, setRecords] = useState([])
  const [filteredRecords, setFilteredRecords] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('day')
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    employeeName: '',
    employeeId: '',
    team: '',
    workplace: '',
    checkIn: '',
    checkOut: '',
    feedback: '',
    color: '#3B82F6'
  })

  useEffect(() => {
    fetchAttendanceRecords()
  }, [filterType])

  useEffect(() => {
    filterRecords()
  }, [records, searchTerm, filterType])

  const fetchAttendanceRecords = async () => {
    try {
      const response = await axios.get(`${API_URL}/attendance`, {
        params: { filterType },
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      setRecords(response.data)
    } catch (error) {
      console.error('Failed to fetch records:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterRecords = () => {
    let filtered = records

    if (searchTerm) {
      filtered = filtered.filter(record =>
        record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.employeeId.includes(searchTerm)
      )
    }

    setFilteredRecords(filtered)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${API_URL}/attendance`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      setRecords([...records, response.data])
      setShowForm(false)
      setFormData({
        date: new Date().toISOString().split('T')[0],
        employeeName: '',
        employeeId: '',
        team: '',
        workplace: '',
        checkIn: '',
        checkOut: '',
        feedback: '',
        color: '#3B82F6'
      })
    } catch (error) {
      console.error('Failed to add record:', error)
    }
  }

  const calculateTotalHours = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return '-'
    const start = new Date(`2000-01-01 ${checkIn}`)
    const end = new Date(`2000-01-01 ${checkOut}`)
    const hours = (end - start) / (1000 * 60 * 60)
    return hours.toFixed(2)
  }

  const exportPDF = () => {
    const doc = new jsPDF()
    doc.setFontSize(16)
    doc.text('Attendance Report', 14, 15)
    doc.setFontSize(10)
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 25)

    const tableColumn = ['Date', 'Employee', 'Employee ID', 'Team', 'Check In', 'Check Out', 'Total Hours']
    const tableRows = filteredRecords.map(record => [
      record.date,
      record.employeeName,
      record.employeeId,
      record.team,
      record.checkIn,
      record.checkOut,
      calculateTotalHours(record.checkIn, record.checkOut)
    ])

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 35
    })

    doc.save('attendance-report.pdf')
  }

  const exportCSV = () => {
    const csv = Papa.unparse(filteredRecords)
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'attendance-report.csv'
    a.click()
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Employee Attendance</h1>
          <p className="text-gray-600 mt-1">Manage and track employee attendance</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Add Record</span>
        </button>
      </div>

      {showForm && (
        <div className="card">
          <h3 className="text-lg font-bold text-gray-900 mb-4">New Attendance Record</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="input-field"
              required
            />
            <input
              type="text"
              placeholder="Employee Name"
              value={formData.employeeName}
              onChange={(e) => setFormData({ ...formData, employeeName: e.target.value })}
              className="input-field"
              required
            />
            <input
              type="text"
              placeholder="Employee ID"
              value={formData.employeeId}
              onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
              className="input-field"
              required
            />
            <input
              type="text"
              placeholder="Team"
              value={formData.team}
              onChange={(e) => setFormData({ ...formData, team: e.target.value })}
              className="input-field"
            />
            <input
              type="text"
              placeholder="Workplace"
              value={formData.workplace}
              onChange={(e) => setFormData({ ...formData, workplace: e.target.value })}
              className="input-field"
            />
            <input
              type="time"
              value={formData.checkIn}
              onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
              className="input-field"
              required
            />
            <input
              type="time"
              value={formData.checkOut}
              onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
              className="input-field"
              required
            />
            <input
              type="color"
              value={formData.color}
              onChange={(e) => setFormData({ ...formData, color: e.target.value })}
              className="input-field cursor-pointer"
            />
            <textarea
              placeholder="Feedback / Notes"
              value={formData.feedback}
              onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
              className="input-field md:col-span-2 lg:col-span-3"
              rows="3"
            />
            <div className="md:col-span-2 lg:col-span-3 flex gap-3">
              <button type="submit" className="btn-primary flex-1">
                Save Record
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="btn-ghost flex-1"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="card">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex-1 flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-lg w-full md:w-auto">
            <Search size={20} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search by name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent outline-none flex-1"
            />
          </div>

          <div className="flex gap-2">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
            >
              <option value="day">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>

            <button onClick={exportPDF} className="btn-secondary flex items-center space-x-2">
              <Download size={20} />
              <span>PDF</span>
            </button>
            <button onClick={exportCSV} className="btn-secondary flex items-center space-x-2">
              <Download size={20} />
              <span>CSV</span>
            </button>
            <button className="btn-ghost flex items-center space-x-2">
              <Printer size={20} />
              <span>Print</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-gray-700 font-semibold">Date</th>
                <th className="px-4 py-3 text-left text-gray-700 font-semibold">Employee</th>
                <th className="px-4 py-3 text-left text-gray-700 font-semibold">ID</th>
                <th className="px-4 py-3 text-left text-gray-700 font-semibold">Team</th>
                <th className="px-4 py-3 text-left text-gray-700 font-semibold">Check In</th>
                <th className="px-4 py-3 text-left text-gray-700 font-semibold">Check Out</th>
                <th className="px-4 py-3 text-left text-gray-700 font-semibold">Total Hours</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.length > 0 ? (
                filteredRecords.map((record, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-3">{record.date}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: record.color }}
                        />
                        <span>{record.employeeName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">{record.employeeId}</td>
                    <td className="px-4 py-3">{record.team}</td>
                    <td className="px-4 py-3">{record.checkIn}</td>
                    <td className="px-4 py-3">{record.checkOut}</td>
                    <td className="px-4 py-3 font-semibold">
                      {calculateTotalHours(record.checkIn, record.checkOut)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Attendance