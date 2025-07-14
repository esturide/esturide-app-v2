import axios from 'axios'
import { API_BASE_URL } from './config' 

const client = axios.create({
    baseURL : API_BASE_URL ,
    timeout : 60000 , // 1 minuto
    responseType : 'json'
})

export default client