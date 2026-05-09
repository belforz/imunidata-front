import axios from "axios";

export const imunidataApi = axios.create({
    baseURL: import.meta.env.VITE_IMUNIDATA_BASE_URL,
    headers:{
        'Content-Type':'application/json', 
    }
})


export const imunidataDocsApi = axios.create({
    baseURL: import.meta.env.VITE_IMUNIDATA_DOCS,
    headers:{
        'Content-Type':'application/json'
    }
})