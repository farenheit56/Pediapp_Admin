import Vue from 'vue'
import axios from 'axios'

Vue.prototype.$axios = axios

// Agregamos la URL base de nuestra API
const api = axios.create({ baseURL: 'https://api.pediapp.com.ar/api' })
//const api = axios.create({ baseURL: 'http://localhost:3001/api' })
Vue.prototype.$api = api

export { axios, api }

