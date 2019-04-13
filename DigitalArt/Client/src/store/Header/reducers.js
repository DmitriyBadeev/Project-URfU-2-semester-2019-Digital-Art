import { OPEN_DIALOG_AUTH,
         CLOSE_DIALOG_AUTH,
         OPEN_DIALOG_REGISTRATION,
         CLOSE_DIALOG_REGISTRATION } from './actions';

const defaultState = {
    isOpenRegistrationDialog: false,
    isOpenAuthDialog: false
};

export const headerReducer = (state = defaultState, action) => {
    switch (action.type) {
        case OPEN_DIALOG_REGISTRATION:
            return {
                ...state,
                isOpenRegistrationDialog: action.payload
            };
        case CLOSE_DIALOG_REGISTRATION:
            return {
                ...state,
                isOpenRegistrationDialog: action.payload
            };
        case OPEN_DIALOG_AUTH:
            return {
                ...state,
                isOpenAuthDialog: action.payload
            };
        case CLOSE_DIALOG_AUTH:
            return {
                ...state,
                isOpenAuthDialog: action.payload
            };
    }

    return state;
};