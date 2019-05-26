import {
    GET_USER_INFO_SUCCESS,
    GET_USER_INFO_UNSUCCESS,
    GET_USER_INFO_LOADING,
    GET_AUTH_USER_SUCCESS,
    GET_AUTH_USER_UNSUCCESS,
    GET_AUTH_USER_LOADING,
    PUT_AUTH_USER_LOADING,
    PUT_AUTH_USER_UNSUCCESS,
    PUT_AUTH_USER_SUCCESS,
    REDIRECTED
} from "./actions";

const defaultState = {
    id: '',
    email: '',
    name: '',
    lastName: '',
    avatar: '',
    dateOfBirthday: '',
    status: '',
    about: '',
    country: '',
    city: '',
    artworks: [],
    isLoading: false,
    authUser: {},
    massage: '',
    isRedirect: false
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
                dateOfBirthday: action.payload.dateOfBirthday,
                status: action.payload.status,
                about: action.payload.about,
                artworks: action.payload.artworks,
                country: action.payload.country,
                city: action.payload.city,
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
                authUser: action.payload,
                isLoading: false
            };

        case GET_AUTH_USER_UNSUCCESS:
            return {
                ...state,
                massage: action.payload,
                isLoading: false
            };
        case GET_AUTH_USER_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case PUT_AUTH_USER_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case PUT_AUTH_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                authUser: action.payload,
                isRedirect: true
            };
        case PUT_AUTH_USER_UNSUCCESS:
            return {
                ...state,
                isLoading: false,
                massage: action.payload
            };
        case REDIRECTED:
            return {
                ...state,
                isRedirect: false
            }
    }

    return state;
};