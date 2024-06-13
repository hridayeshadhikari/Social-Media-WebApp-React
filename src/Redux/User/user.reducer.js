import { GET_USERS_POST_FAILURE } from "../Post/post.actionType";
import { GET_USERS_FOLLOWER_FAILURE, GET_USERS_FOLLOWER_REQUEST, GET_USERS_FOLLOWER_SUCCESS, GET_USER_BY_ID_REQUEST, GET_USER_BY_ID_SUCCESS } from "./user.actionType";

const initialState = {
    loading: false,
    error: null,
    user: null,
    follower: null
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_BY_ID_REQUEST:
        case GET_USERS_FOLLOWER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case GET_USER_BY_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                user: action.payload
            }

        case GET_USERS_FOLLOWER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                follower:action.payload
            }

        case GET_USERS_POST_FAILURE:
        case GET_USERS_FOLLOWER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;

    }
}