import axios from 'axios';
import {MAIN_PATH, GET_USER_INFO_URL, GET_AUTH_USER_URL, PUT_USER_INFO_URL} from "../../../Config";

export const GET_USER_INFO_SUCCESS = 'GET_USER_INFO_SUCCESS';
export const GET_USER_INFO_UNSUCCESS = 'GET_USER_INFO_UNSUCCESS';
export const GET_USER_INFO_LOADING = 'GET_USER_INFO_LOADING';

export const GET_AUTH_USER_SUCCESS = 'GET_USER_ID_SUCCESS';
export const GET_AUTH_USER_UNSUCCESS = 'GET_USER_ID_UNSUCCESS';
export const GET_AUTH_USER_LOADING = 'GET_AUTH_USER_LOADING';

export const PUT_AUTH_USER_SUCCESS = 'PUT_AUTH_USER_SUCCESS';
export const PUT_AUTH_USER_UNSUCCESS = 'PUT_AUTH_USER_UNSUCCESS';
export const PUT_AUTH_USER_LOADING = 'PUT_AUTH_USER_LOADING';

export const getUserInfoSuccess = (user) => {
    return {
        type: GET_USER_INFO_SUCCESS,
        payload: user,
    }
};

const getUserInfoUnsuccess = (error) => {
    return {
        type: GET_USER_INFO_UNSUCCESS,
        payload: error
    }
};

const getUserInfoLoading = () => {
    return {
        type: GET_USER_INFO_LOADING,
    }
};

const getAuthUserSuccess = (info) => {
    return {
        type: GET_AUTH_USER_SUCCESS,
        payload: info
    }
};

const getAuthUserUnsuccess = (error) => {
    return {
        type: GET_AUTH_USER_UNSUCCESS,
        payload: error
    }
};

const getAuthUserLoading = () => {
    return {
        type: GET_AUTH_USER_LOADING
    }
};

const options = (id, sortParams) => {
    return {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`},
        baseURL: MAIN_PATH,
        url: GET_USER_INFO_URL(id),
        params: {
            sortParams: sortParams
        }
    };
};

export const getUserInfo = (id, sortParams) => {
    return dispatch => {
        dispatch(getUserInfoLoading());
        axios(options(id, sortParams))
            .then(res => {
                dispatch(getUserInfoSuccess(res.data));
            })
            .catch(error => {
                dispatch(getUserInfoUnsuccess(error));
            })
    }
};

export const getAuthUser = () => {

    const options = {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`},
        baseURL: MAIN_PATH,
        url: GET_AUTH_USER_URL
    };

    return dispatch => {
        dispatch(getAuthUserLoading());
        axios(options)
            .then(res => {
                dispatch(getAuthUserSuccess(res.data));
            })
            .catch(error => dispatch(getAuthUserUnsuccess(error)))
    }
};

const putAuthUserSuccess = (user) => {
    return {
        type: PUT_AUTH_USER_SUCCESS,
        payload: user
    }
};

const putAuthUserUnsuccess = (error) => {
    return {
        type: PUT_AUTH_USER_UNSUCCESS,
        payload: error
    }
};

const putAuthUserLoading = () => {
    return {
        type: PUT_AUTH_USER_LOADING
    }
};

export const putAuthUser = (newInfo) => {

    const options = {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`},
        'Content-Type': 'multipart/form-data',
    };

    return dispatch => {
        dispatch(putAuthUserLoading());
        axios.put(MAIN_PATH+PUT_USER_INFO_URL, newInfo, options)
            .then(res => {
                dispatch(putAuthUserSuccess(res.data));
            })
            .catch(error => dispatch(putAuthUserUnsuccess(error)))
    }
};