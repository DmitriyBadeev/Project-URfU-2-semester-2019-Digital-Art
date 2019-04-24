import {
    GET_ART_URL,
    GET_LIKES_URL,
    MAIN_PATH,
    POST_LIKE_URL,
    DELETE_LIKE_URL
} from "../../Config";
import axios from "axios";

export const GET_LIKES_SUCCESS = 'GET_LIKES_SUCCESS';
export const GET_LIKES_UNSUCCESS = 'GET_LIKES_UNSUCCESS';

export const POST_LIKE_SUCCESS = 'POST_LIKE_SUCCESS';
export const POST_LIKE_UNSUCCESS = 'POST_LIKE_UNSUCCESS';

export const DELETE_LIKE_SUCCESS = 'DELETE_LIKE_SUCCESS';
export const DELETE_LIKE_UNSUCCESS = 'DELETE_LIKE_UNSUCCESS';

export const GET_ARTWORK_SUCCESS = 'GET_ARTWORK_SUCCESS';
export const GET_ARTWORK_UNSUCCESS = 'GET_ARTWORK_UNSUCCESS';
export const GET_ARTWORK_LOADING = 'GET_ARTWORK_LOADING';

export const getArtworkSuccess = (work) => {
    return {
        type: GET_ARTWORK_SUCCESS,
        payload: work
    }
};

const getArtworkUnsuccess = (error) => {
    return {
        type: GET_ARTWORK_UNSUCCESS,
        payload: error
    }
};

const getArtworkLoading = () => {
    return {
        type: GET_ARTWORK_LOADING
    }
};

const getLikeSuccess = (data) => {
    return {
        type: GET_LIKES_SUCCESS,
        payload: data
    }
};

const getLikeUnsuccess = (error) => {
    return {
        type: GET_ARTWORK_UNSUCCESS,
        payload: error
    }
};

const postLikeSuccess = (count) => {
    return {
        type: POST_LIKE_SUCCESS,
        payload: count
    }
};

const postLikeUnsuccess = (error) => {
    return {
        type: POST_LIKE_UNSUCCESS,
        payload: error
    }
};

const deleteLikeSuccess = (count) => {
    return {
        type: DELETE_LIKE_SUCCESS,
        payload: count
    }
};

const deleteLikeUnsuccess = (error) => {
    return {
        type: DELETE_LIKE_UNSUCCESS,
        payload: error
    }
};

export const postLike = (likeData) => {

    const options = {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`}
    };

    return dispatch => {
        axios.post(MAIN_PATH+POST_LIKE_URL, likeData, options)
            .then(res => {
                dispatch(postLikeSuccess(res.data));
            })
            .catch(error => dispatch(postLikeUnsuccess(error)));
    }
};

export const deleteLike = (userId, idArt) => {

    const options = {
        headers: {  'Authorization': `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`},
        params: {
            userId: userId,
            artworkId: idArt
        }
    };

    return dispatch => {
        axios.delete(MAIN_PATH+DELETE_LIKE_URL, options)
            .then(res => {
                dispatch(deleteLikeSuccess(res.data))
            })
            .catch(error => dispatch(deleteLikeUnsuccess(error)))
    }
};

export const getLike = (userId, idArt) => {
    console.log(idArt + " get like for " + userId + " user on " + MAIN_PATH+GET_LIKES_URL);

    return dispatch => {
        axios.get(MAIN_PATH+GET_LIKES_URL, { params: { userId: userId, artworkId: idArt } })
            .then(res => {
                dispatch(getLikeSuccess(res.data))
            })
            .catch(error => dispatch(getLikeUnsuccess(error)))
    }
};

export const getUserArtwork = id => {
    return dispatch => {
        dispatch(getArtworkLoading());
        axios.get(MAIN_PATH+GET_ART_URL(id))
            .then(res => {
                dispatch(getArtworkSuccess(res.data))
            })
            .catch(error => dispatch(getArtworkUnsuccess(error)))
    }
};