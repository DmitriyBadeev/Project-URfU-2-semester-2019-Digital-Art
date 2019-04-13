import { GET_USER_INFO_SUCCESS, GET_USER_INFO_UNSUCCESS } from "./actions";

const defaultState = {
    id: '',
    email: '',
    name: '',
    lastName: '',
    artworks: []
};

export const userInfoReducer = (state = defaultState, action) => {
    switch (action.type) {
        case GET_USER_INFO_SUCCESS:
            return {
                id: action.payload.id,
                email: action.payload.email,
                name: action.payload.name,
                lastName: action.payload.lastName,
                artworks: action.payload.artworks
            };
        case GET_USER_INFO_UNSUCCESS:
            return state;
    }

    return state;
};