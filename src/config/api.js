import axios from "axios"

//url in which backend application is running
// export const API_BASE_URL="https://social-media-webapp-production.up.railway.app"
export const API_BASE_URL="http://localhost:8080"

const jwtToken=localStorage.getItem("jwt")

export const api=axios.create({baseURL:API_BASE_URL,
    headers:{
        "Authorization":`Bearer ${jwtToken}`,
        "Content-Type":"application/json"    
}})
