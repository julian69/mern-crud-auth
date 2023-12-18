import axios from 'axios'

const API = 'http://localhost:3000/api' // TODO: move to constants,

const instance = axios.create({
  baseURL: API, 
  withCredentials: true
})

export default instance