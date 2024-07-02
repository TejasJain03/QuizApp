import axios from 'axios'

const instance = axios.create({
  // baseURL: 'https://event-management-api-iota.vercel.app',
  baseURL: 'http://localhost:8081/api',
  withCredentials: true,
})

export default instance
