// import axios from "axios";
// const local = 'http://localhost:5000'

// const api = axios.create({
//     baseURL : `${local}/api`
// })

// export default api

import axios from "axios";
const local = 'http://localhost:5000'
const production = 'https://multi-vendor-ecommerce-backend-vh2u.onrender.com'

let api_url = ''
let mode = 'pro'

if (mode === 'pro') {
    api_url = production
} else {
    api_url = local
}

const api = axios.create({
    baseURL : `${api_url}/api`
})


export default api