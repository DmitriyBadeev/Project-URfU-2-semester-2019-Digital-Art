import axios from 'axios';
import { MAIN_PATH, GET_USER_INFO_URL, GET_AUTH_USER_URL} from "../../../Config";

export const GET_USER_INFO_SUCCESS = 'GET_USER_INFO_SUCCESS';
export const GET_USER_INFO_UNSUCCESS = 'GET_USER_INFO_UNSUCCESS';
export const GET_USER_INFO_LOADING = 'GET_USER_INFO_LOADING';

export const GET_AUTH_USER_SUCCESS = 'GET_USER_ID_SUCCESS';
export const GET_AUTH_USER_UNSUCCESS = 'GET_USER_ID_UNSUCCESS';

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

const options = (id) => {
    return {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`},
        baseURL: MAIN_PATH,
        url: GET_USER_INFO_URL(id)
    };
};

export const getUserInfo = (id) => {
    return dispatch => {
        dispatch(getUserInfoLoading());
        axios(options(id))
            .then(res => {
                console.log(res.data);
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
        axios(options)
            .then(res => {
                dispatch(getAuthUserSuccess(res.data));
            })
            .catch(error => dispatch(getAuthUserUnsuccess(error)))
    }
};