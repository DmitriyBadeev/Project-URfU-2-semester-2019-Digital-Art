export const REGISTRATION_WRITE_EMAIL_TEXT_TO_STATE = 'REGISTRATION_WRITE_EMAIL_TEXT_TO_STATE';
export const REGISTRATION_WRITE_PASSWORD_TEXT_TO_STATE = 'REGISTRATION_WRITE_PASSWORD_TEXT_TO_STATE';
export const REGISTRATION_WRITE_NAME_TEXT_TO_STATE = 'REGISTRATION_WRITE_NAME_TEXT_TO_STATE';

export const setEmailInState = (email) => (
    {
        type: REGISTRATION_WRITE_EMAIL_TEXT_TO_STATE,
        payload: email
    }
);

export const setPasswordInState = (password) => (
    {
        type: REGISTRATION_WRITE_PASSWORD_TEXT_TO_STATE,
        payload: password
    }
);

export const setNameInState = (name) => (
    {
        type: REGISTRATION_WRITE_NAME_TEXT_TO_STATE,
        payload: name
    }
);


