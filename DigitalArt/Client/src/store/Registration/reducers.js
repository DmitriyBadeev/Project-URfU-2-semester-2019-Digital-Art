import {
    REGISTRATION_WRITE_EMAIL_TEXT_TO_STATE,
    REGISTRATION_WRITE_PASSWORD_TEXT_TO_STATE,
    REGISTRATION_WRITE_NAME_TEXT_TO_STATE
} from "./actions";

const defaultState = {
    email: '',
    password: '',
    name: ''
};

export const registrationReducer = (state = defaultState, action) => {
    switch (action.type) {
        case REGISTRATION_WRITE_EMAIL_TEXT_TO_STATE:
            return {
                ...state,
                email: action.payload
            };

        case REGISTRATION_WRITE_PASSWORD_TEXT_TO_STATE:
            return {
                ...state,
                password: action.payload
            };

        case REGISTRATION_WRITE_NAME_TEXT_TO_STATE:
            return {
                ...state,
                name: action.payload
            };
    }
    return state;
};