import { REGISTRATION_SUCCESS, REGISTRATION_UNSUCCESS } from "./actions";


const defaultState = {
    massage: ''
};

export const registrationReducer = (state = defaultState, action) => {
    switch (action.type) {
        case REGISTRATION_SUCCESS:
            return {
                ...state,
                massage: action.payload
            };
        case REGISTRATION_UNSUCCESS:
            return {
                ...state,
                massage: action.payload
            }
    }

    return state;
};