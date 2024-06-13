import { api } from "../../config/api"
import { GET_USERS_FOLLOWER_FAILURE, GET_USERS_FOLLOWER_REQUEST, GET_USERS_FOLLOWER_SUCCESS, GET_USER_BY_ID_FAILURE, GET_USER_BY_ID_REQUEST, GET_USER_BY_ID_SUCCESS } from "./user.actionType"

export const getUserByID=(userId)=>async(dispatch)=>{
    dispatch({type:GET_USER_BY_ID_REQUEST})
    try {
        const {data}=await api.get(`api/user/${userId}`)
        dispatch({type:GET_USER_BY_ID_SUCCESS,payload:data})
    } catch (error) {
        dispatch({type:GET_USER_BY_ID_FAILURE,payload:error})
    }
}

export const getUsersFollower=(userId)=>async(dispatch)=>{
    dispatch({type:GET_USERS_FOLLOWER_REQUEST})
    try {
        const {data}=await api.get(`api/user/follower/${userId}`)
        dispatch({type:GET_USERS_FOLLOWER_SUCCESS,payload:data})
    } catch (error) {
        dispatch({type:GET_USERS_FOLLOWER_FAILURE,payload:error})
    }
}