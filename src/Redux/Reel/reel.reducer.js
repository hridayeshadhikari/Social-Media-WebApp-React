


import { CREATE_REEL_COMMENT_FAILURE, CREATE_REEL_COMMENT_REQUEST, CREATE_REEL_COMMENT_SUCCESS, GET_ALL_REELS_FAILURE, GET_ALL_REELS_REQUEST, GET_ALL_REELS_SUCCESS, GET_USERS_REEL_FAILURE, GET_USERS_REEL_REQUEST, GET_USERS_REEL_SUCCESS, LIKE_REEL_COMMENT_FAILURE, LIKE_REEL_COMMENT_REQUEST, LIKE_REEL_COMMENT_SUCCESS, LIKE_REEL_FAILURE, LIKE_REEL_REQUEST, LIKE_REEL_SUCCESS } from "./reel.actionType";


// Initial state
const initialState = {
    reel: [],
    loading: false,
    error: null,
    like:null,
    comments:[],
    newComment:null
};

// Reducer function
const reelReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_REELS_REQUEST:
        case GET_USERS_REEL_REQUEST:
        case LIKE_REEL_REQUEST:
        case CREATE_REEL_COMMENT_REQUEST:
        case LIKE_REEL_COMMENT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case GET_ALL_REELS_SUCCESS:
        case GET_USERS_REEL_SUCCESS:
            return {
                ...state,
                reel: action.payload, 
                // Update 'reel' with the fetched data
                comments: action.payload.comments,
                loading: false,
                error: null
            };

        case LIKE_REEL_COMMENT_SUCCESS:
            return{
                ...state,
                newComment:action.payload,
                loading:false,
                error:null
            }

            case CREATE_REEL_COMMENT_SUCCESS:
                const newComment = action.payload;
                return {
                    ...state,
                    loading: false,
                    error: null,
                    newComment: newComment,
                    reel: state.reel.map(item => {
                        if (item.id === newComment.reelId) {
                            return {
                                ...item,
                                comments: [...item.comments, newComment]
                            };
                        }
                        return item;
                    })
                };
            

        case LIKE_REEL_SUCCESS:
            return{
                ...state,
                like:action.payload,
                reel: state.reel.map((item) => item.id === action.payload
                    .id ? action.payload : item),
                loading:false,
                error:null
            }
        case GET_ALL_REELS_FAILURE:
        case GET_USERS_REEL_FAILURE:
        case LIKE_REEL_FAILURE:
        case CREATE_REEL_COMMENT_FAILURE:
        case LIKE_REEL_COMMENT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload // Update 'error' with the error received
            };
        default:
            return state;
    }
};

export default reelReducer;