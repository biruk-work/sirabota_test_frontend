import axios from 'axios'

const REACT_APP_SERVER_URL = 'http://localhost:4000/api/employees'

export default axios.create({
    baseURL: REACT_APP_SERVER_URL,
    headers: {
        'Content-type': 'application/json',
    },
})
