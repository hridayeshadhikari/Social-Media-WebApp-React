import { api } from "../../config/api"
import { CREATE_REEL_COMMENT_FAILURE, CREATE_REEL_COMMENT_REQUEST, CREATE_REEL_COMMENT_SUCCESS, CREATE_REEL_FAILURE, CREATE_REEL_REQUEST, CREATE_REEL_SUCCESS, GET_ALL_REELS_FAILURE, GET_ALL_REELS_REQUEST, GET_ALL_REELS_SUCCESS, GET_USERS_REEL_REQUEST, LIKE_REEL_FAILURE, LIKE_REEL_REQUEST, LIKE_REEL_SUCCESS } from "./reel.actionType"

export const getAllReels = () => async (dispatch) => {
    dispatch({ type: GET_ALL_REELS_REQUEST })
    try {
        const { data } = await api.get("/api/reels")
        dispatch({ type: GET_ALL_REELS_SUCCESS, payload: data })
        // console.log("<========>",data)
    } catch (error) {
        dispatch({ type: GET_ALL_REELS_FAILURE, payload: error })
    }
}

export const createReel = (reelData) => async (dispatch) => {
    dispatch({ type: CREATE_REEL_REQUEST })
    try {
        const { data } = await api.post("/api/reel/create", reelData)
        dispatch({ type: CREATE_REEL_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: CREATE_REEL_FAILURE, payload: error })
    }
}

export const getUsersReel = (userId) => async (dispatch) => {
    dispatch({ type: GET_USERS_REEL_REQUEST })
    try {
        const { data } = await api.get(`/api/reel/${userId}`)
        dispatch({ type: GET_ALL_REELS_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: GET_ALL_REELS_FAILURE, payload: error })
    }
}

export const likeReel = (reelId) => async (dispatch) => {
    dispatch({ type: LIKE_REEL_REQUEST })
    try {
        const { data } = await api.put(`/api/reel/like/${reelId}`)
        dispatch({ type: LIKE_REEL_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: LIKE_REEL_FAILURE, payload: error })
    }
}

export const createReelComment = (reqData) => async (dispatch) => {
    dispatch({type:CREATE_REEL_COMMENT_REQUEST})
    try {
        const {data}=await api.post(`/api/reel/comment/${reqData.reelId}`,reqData.data)
        dispatch({type:CREATE_REEL_COMMENT_SUCCESS,payload:data})
    } catch (error) {
        dispatch({type:CREATE_REEL_COMMENT_FAILURE,payload:error})
    }
}