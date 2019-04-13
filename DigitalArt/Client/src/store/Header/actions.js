export const OPEN_DIALOG_REGISTRATION = 'OPEN_DIALOG_REGISTRATION';
export const OPEN_DIALOG_AUTH = 'OPEN_DIALOG_AUTH';

export const CLOSE_DIALOG_REGISTRATION = 'CLOSE_DIALOG_REGISTRATION';
export const CLOSE_DIALOG_AUTH = 'CLOSE_DIALOG_AUTH';

export const openDialogRegistration = () => {
    return {
        type: OPEN_DIALOG_REGISTRATION,
        payload: true
    };
};

export const closeDialogRegistration = () => {
    return {
        type: CLOSE_DIALOG_REGISTRATION,
        payload: false
    };
};

export const openDialogAuth = () => {
    return {
        type: OPEN_DIALOG_AUTH,
        payload: true
    };
};

export const closeDialogAuth = () => {
    return {
        type: CLOSE_DIALOG_AUTH,
        payload: false
    };
};
