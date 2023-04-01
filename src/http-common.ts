import axios from 'axios'

const VITE_APP_SERVER_URL = import.meta.env.VITE_APP_SERVER_URL

export default axios.create({
    baseURL: VITE_APP_SERVER_URL,
    headers: {
        'Content-type': 'application/json',
    },
})
