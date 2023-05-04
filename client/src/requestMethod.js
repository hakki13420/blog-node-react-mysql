import axios from 'axios'

export const publicRequest = axios.create({
  baseURL: 'http://localhost:3000'

})

export const privateRequest = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true

})

// privateRequest.interceptors.response.use(
//   response => response,
//   error => {
//     if (error.response.status === 401 || error.response.status === 403) {
//       window.localStorage.clear()
//     }
//   }
// )
