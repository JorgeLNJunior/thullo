import axios from 'axios'

const API_AUTH_TOKEN = localStorage.getItem('access_token')

export const apiClient = axios.create({
  baseURL: import.meta.env['VITE_API_URL'],
  headers: {
    authorization: `Bearer ${API_AUTH_TOKEN}`
  }
})
