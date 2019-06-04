import axios from 'axios';
import {DELETE_ART_URL, MAIN_PATH, GET_SUBS_URL, POST_SUB_URL, DELETE_SUB_URL} from "../../Config";

export const DELETE_ARTWORK_SUCCESS = "DELETE_ARTWORK_SUCCESS";
export const DELETE_ARTWORK_UNSUCCESS = "DELETE_ARTWORK_UNSUCCESS";
export const DELETE_ARTWORK_LOADING = "DELETE_ARTWORK_LOADING";

export const GET_SUBS_SUCCESS = 'GET_SUBS_SUCCESS';
export const GET_SUBS_UNSUCCESS = 'GET_SUBS_UNSUCCESS';
export const GET_SUBS_LOADING = 'GET_SUBS_LOADING';

export const POST_SUBS_UNSUCCESS = 'POST_SUBS_UNSUCCESS';
export const DELETE_SUBS_UNSUCCESS = 'DELETE_SUBS_UNSUCCESS';

const deleteArtworkSuccess = () => {
    return {
        type: DELETE_ARTWORK_SUCCESS,
        payload: "Работа удалена успешно!"
    }
};

const deleteArtworkUnsuccess = (error) => {
    return {
        type: DELETE_ARTWORK_UNSUCCESS,
        payload: "Произошла ошибка :( " + error
    }
};

const deleteArtworkLoading = () => {
    return {
        type: DELETE_ARTWORK_LOADING
    }
};

const options = id => (
    {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`},
        baseURL: MAIN_PATH,
        url: DELETE_ART_URL(id)
    }
);

export const deleteArtwork = (id) => {
    return dispatch => {
        dispatch(deleteArtworkLoading());
        axios(options(id))
            .then(res => {
                dispatch(deleteArtworkSuccess());
                location.reload()
            })
            .catch(error => dispatch(deleteArtworkUnsuccess(error)))
    }
};

export const getSubscribers = (idAuthor, idAuthUser) => {

    const options = {
        params: {
            idAuthor: idAuthor,
            idAuthUser: idAuthUser
        }
    };

    return dispatch => {
        dispatch(subscribersLoading());
        axios.get(MAIN_PATH+GET_SUBS_URL, options)
            .then(res => {
                dispatch(getSubscribersSuccess(res.data))
            })
            .catch(error => dispatch(getSubscribersUnsuccess(error)))
    }
};

const getSubscribersSuccess = (data) => {
    return {
        type: GET_SUBS_SUCCESS,
        payload: data
    }
};

const getSubscribersUnsuccess = (error) => {
    return {
        type: GET_SUBS_UNSUCCESS,
        payload: error
    }
};

const subscribersLoading = () => {
    return {
        type: GET_SUBS_LOADING
    }
};

export const postSubscribe = (idAuthor, idUser) => {

    const options = {
        method: 'POST',
        baseURL: MAIN_PATH,
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`},
        url: POST_SUB_URL,
        params: {
            idAuthor: idAuthor,
            idUser: idUser
        }
    };

    return dispatch => {
        dispatch(subscribersLoading());
        axios(options)
            .then(res => {
                dispatch(getSubscribersSuccess(res.data));
            })
            .catch(error => dispatch(postSubscribeUnsuccess(error)))
    }
};

const postSubscribeUnsuccess = (error) => {
    return {
        type: POST_SUBS_UNSUCCESS,
        payload: error
    }
};

export const deleteSubscribe = (idAuthor, idUser) => {

    const options = {
        method: 'DELETE',
        baseURL: MAIN_PATH,
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`},
        url: DELETE_SUB_URL,
        params: {
            idAuthor: idAuthor,
            idUser: idUser
        }
    };

    return dispatch => {
        dispatch(subscribersLoading());
        axios(options)
            .then(res => {
                dispatch(getSubscribersSuccess(res.data));
            })
            .catch(error => dispatch(deleteSubscribeUnsuccess(error)))
    }
};

const deleteSubscribeUnsuccess = (error) => {
    return {
        type: DELETE_SUBS_UNSUCCESS,
        payload: error
    }
};