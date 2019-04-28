import {
    GET_USER_INFO_SUCCESS,
    GET_USER_INFO_UNSUCCESS,
    GET_USER_INFO_LOADING,
    GET_AUTH_USER_SUCCESS,
    GET_AUTH_USER_UNSUCCESS
} from "./actions";

const defaultState = {
    id: '',
    email: '',
    name: '',
    lastName: '',
    avatar: '',
    artworks: [],
    isLoading: false,
    authUser: {},
    error: ''
};

export const userInfoReducer = (state = defaultState, action) => {
    switch (action.type) {
        case GET_USER_INFO_SUCCESS:
            return {
                ...state,
                id: action.payload.id,
                email: action.payload.email,
                name: action.payload.name,
                lastName: action.payload.lastName,
                avatar: action.payload.avatar,
                artworks: action.payload.artworks,
                isLoading: false
            };

        case GET_USER_INFO_UNSUCCESS:
            return {
                ...state,
                isLoading: false
            };

        case GET_USER_INFO_LOADING:
            return {
                ...state,
                isLoading: true
            };

        case GET_AUTH_USER_SUCCESS:
            return {
                ...state,
                authUser: action.payload
            };

        case GET_AUTH_USER_UNSUCCESS:
            return {
                ...state,
                error: action.payload
            }

    }

    return state;
};