import {AUTHORIZATION_SUCCESS,
        AUTHORIZATION_UNSUCCESS,
        IS_REDIRECTED} from "./actions";

const defaultState = {
    token: '',
    massage: '',
    isAuth: !!localStorage.getItem('token'),
};

export const authorizationReducer = (state = defaultState, action) => {
    switch (action.type) {
        case AUTHORIZATION_SUCCESS:
            return {
                ...state,
                token: action.payload.token,
                massage: action.payload.massage,
                isAuth: true,
                isRedirect: true
            };
        case AUTHORIZATION_UNSUCCESS:
            return {
                ...state,
                massage: action.payload
            };
    }

    return state;
};