import {
    DELETE_ARTWORK_UNSUCCESS,
    DELETE_ARTWORK_SUCCESS,
    DELETE_ARTWORK_LOADING,
    GET_SUBS_LOADING,
    GET_SUBS_UNSUCCESS,
    GET_SUBS_SUCCESS,
    POST_SUBS_UNSUCCESS,
    DELETE_SUBS_UNSUCCESS
} from "./actions";

const defaultState = {
    massage: "",
    isLoading: false,
    countSubs: 0,
    isLoadingSubs: false,
    isSubscribe: false
};

export const profileReducer = (state = defaultState, action) => {
    switch (action.type) {
        case DELETE_ARTWORK_SUCCESS:
            return {
                ...state,
                isLoading: false,
                massage: action.payload
            };
        case DELETE_ARTWORK_UNSUCCESS:
            return {
                ...state,
                isLoading: false,
                massage: action.payload
            };
        case DELETE_ARTWORK_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case GET_SUBS_SUCCESS:
            return {
                ...state,
                countSubs: action.payload.countSubscribers,
                isSubscribe: action.payload.isSubscribeAuthUser,
                isLoadingSubs: false
            };
        case GET_SUBS_UNSUCCESS:
            return {
                ...state,
                massage: action.payload,
                isLoadingSubs: false
            };
        case GET_SUBS_LOADING:
            return {
                ...state,
                isLoadingSubs: true,
                massage: "",
            };
        case POST_SUBS_UNSUCCESS:
            return {
                ...state,
                massage: "Авторизируйтесь, чтобы следить за автором",
                isLoadingSubs: false
            };
        case DELETE_SUBS_UNSUCCESS:
            return {
                ...state,
                isLoadingSubs: false,
                massage: action.payload,
            }
    }

    return state;
};
