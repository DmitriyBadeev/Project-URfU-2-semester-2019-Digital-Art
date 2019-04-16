import axios from 'axios';
import { MAIN_PATH, GET_USER_INFO_URL} from "../../../Config";

export const GET_USER_INFO_SUCCESS = 'GET_USER_INFO_SUCCESS';
export const GET_USER_INFO_UNSUCCESS = 'GET_USER_INFO_UNSUCCESS';
export const GET_USER_INFO_LOADING = 'GET_USER_INFO_LOADING';

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

const options = {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`},
    baseURL: MAIN_PATH,
    url: GET_USER_INFO_URL
};

export const getUserInfo = () => {
    return dispatch => {
        dispatch(getUserInfoLoading());
        axios(options)
            .then(res => {
                console.log(res.data);
                dispatch(getUserInfoSuccess(res.data));
            })
            .catch(error => {
                dispatch(getUserInfoUnsuccess(error));
            })
    }
};