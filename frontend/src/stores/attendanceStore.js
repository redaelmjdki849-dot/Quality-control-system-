import { create } from 'zustand'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export const useAttendanceStore = create((set, get) => ({
  records: [],
  isLoading: false,
  error: null,
  filters: {
    startDate: null,
    endDate: null,
    employee: '',
    team: '',
    workplace: '',
    filterType: 'day' // day, week, month, year
  },

  fetchRecords: async (filters = {}) => {
    set({ isLoading: true, error: null })
    try {
      const response = await axios.get(`${API_URL}/attendance`, {
        params: filters,
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      set({ records: response.data, isLoading: false })
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to fetch records', isLoading: false })
    }
  },

  addRecord: async (data) => {
    try {
      const response = await axios.post(`${API_URL}/attendance`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      set({ records: [...get().records, response.data] })
      return { success: true }
    } catch (error) {
      return { success: false, error: error.response?.data?.message }
    }
  },

  updateFilters: (filters) => {
    set({ filters: { ...get().filters, ...filters } })
  }
}))