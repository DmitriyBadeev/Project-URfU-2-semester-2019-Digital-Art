import { GET_USER_INFO_SUCCESS, GET_USER_INFO_UNSUCCESS, GET_USER_INFO_LOADING } from "./actions";

const defaultState = {
    id: '',
    email: '',
    name: '',
    lastName: '',
    avatar: '',
    artworks: [],
    isLoading: false
};

export const userInfoReducer = (state = defaultState, action) => {
    switch (action.type) {
        case GET_USER_INFO_SUCCESS:
            return {
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
            }
    }

    return state;
};