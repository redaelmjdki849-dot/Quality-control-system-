import React, { useState, useEffect } from 'react'
import { Search, Download, Plus } from 'lucide-react'
import axios from 'axios'
import jsPDF from 'jspdf'
import Papa from 'papaparse'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

function Transport() {
  const [records, setRecords] = useState([])
  const [filteredRecords, setFilteredRecords] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterMonth, setFilterMonth] = useState(new Date().toISOString().slice(0, 7))
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    transportName: '',
    place: '',
    checkIn: '',
    checkOut: '',
    targetHours: 0,
    notes: ''
  })

  useEffect(() => {
    fetchTransportRecords()
  }, [filterMonth])

  useEffect(() => {
    filterRecords()
  }, [records, searchTerm])

  const fetchTransportRecords = async () => {
    try {
      const response = await axios.get(`${API_URL}/transport`, {
        params: { month: filterMonth },
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
        record.transportName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.place.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredRecords(filtered)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${API_URL}/transport`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      setRecords([...records, response.data])
      setShowForm(false)
      setFormData({
        date: new Date().toISOString().split('T')[0],
        transportName: '',
        place: '',
        checkIn: '',
        checkOut: '',
        targetHours: 0,
        notes: ''
      })
    } catch (error) {
      console.error('Failed to add record:', error)
    }
  }

  const calculateTotalHours = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return 0
    const start = new Date(`2000-01-01 ${checkIn}`)
    const end = new Date(`2000-01-01 ${checkOut}`)
    return ((end - start) / (1000 * 60 * 60)).toFixed(2)
  }

  const exportPDF = () => {
    const doc = new jsPDF()
    doc.setFontSize(16)
    doc.text('Transport Report', 14, 15)
    doc.setFontSize(10)
    doc.text(`Month: ${filterMonth}`, 14, 25)

    const tableColumn = ['Date', 'Transport', 'Place', 'Check In', 'Check Out', 'Total Hours']
    const tableRows = filteredRecords.map(record => [
      record.date,
      record.transportName,
      record.place,
      record.checkIn,
      record.checkOut,
      calculateTotalHours(record.checkIn, record.checkOut)
    ])

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 35
    })

    doc.save('transport-report.pdf')
  }

  const exportCSV = () => {
    const csv = Papa.unparse(filteredRecords)
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'transport-report.csv'
    a.click()
  }

  const totalHours = filteredRecords.reduce((sum, record) => {
    return sum + parseFloat(calculateTotalHours(record.checkIn, record.checkOut))
  }, 0)

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Transport Management</h1>
          <p className="text-gray-600 mt-1">Track transport check-ins and operations</p>
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
          <h3 className="text-lg font-bold text-gray-900 mb-4">New Transport Record</h3>
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
              placeholder="Transport Name"
              value={formData.transportName}
              onChange={(e) => setFormData({ ...formData, transportName: e.target.value })}
              className="input-field"
              required
            />
            <input
              type="text"
              placeholder="Place"
              value={formData.place}
              onChange={(e) => setFormData({ ...formData, place: e.target.value })}
              className="input-field"
              required
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
              type="number"
              placeholder="Target Hours"
              value={formData.targetHours}
              onChange={(e) => setFormData({ ...formData, targetHours: parseFloat(e.target.value) })}
              className="input-field"
              step="0.5"
            />
            <textarea
              placeholder="Notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="input-field lg:col-span-3"
              rows="2"
            />
            <div className="lg:col-span-3 flex gap-3">
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card">
          <p className="text-gray-600 text-sm mb-1">Total Records</p>
          <p className="text-3xl font-bold text-blue-900">{filteredRecords.length}</p>
        </div>
        <div className="card">
          <p className="text-gray-600 text-sm mb-1">Total Hours</p>
          <p className="text-3xl font-bold text-orange-500">{totalHours.toFixed(2)}h</p>
        </div>
        <div className="card">
          <p className="text-gray-600 text-sm mb-1">Month</p>
          <p className="text-lg font-semibold text-gray-900">{filterMonth}</p>
        </div>
      </div>

      <div className="card">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex-1 flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-lg w-full md:w-auto">
            <Search size={20} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search by transport or place..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent outline-none flex-1"
            />
          </div>

          <div className="flex gap-2">
            <input
              type="month"
              value={filterMonth}
              onChange={(e) => setFilterMonth(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
            />
            <button onClick={exportPDF} className="btn-secondary flex items-center space-x-2">
              <Download size={20} />
              <span>PDF</span>
            </button>
            <button onClick={exportCSV} className="btn-secondary flex items-center space-x-2">
              <Download size={20} />
              <span>CSV</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-gray-700 font-semibold">Date</th>
                <th className="px-4 py-3 text-left text-gray-700 font-semibold">Transport</th>
                <th className="px-4 py-3 text-left text-gray-700 font-semibold">Place</th>
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
                    <td className="px-4 py-3">{record.transportName}</td>
                    <td className="px-4 py-3">{record.place}</td>
                    <td className="px-4 py-3">{record.checkIn}</td>
                    <td className="px-4 py-3">{record.checkOut}</td>
                    <td className="px-4 py-3 font-semibold">
                      {calculateTotalHours(record.checkIn, record.checkOut)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
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

export default Transport