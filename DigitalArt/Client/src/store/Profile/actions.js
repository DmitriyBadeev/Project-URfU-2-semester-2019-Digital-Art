import axios from 'axios';
import {DELETE_ART_URL, GET_USER_INFO_URL, MAIN_PATH} from "../../Config";

export const DELETE_ARTWORK_SUCCESS = "DELETE_ARTWORK_SUCCESS";
export const DELETE_ARTWORK_UNSUCCESS = "DELETE_ARTWORK_UNSUCCESS";
export const DELETE_ARTWORK_LOADING = "DELETE_ARTWORK_LOADING";

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
                console.log(res.data);
                dispatch(deleteArtworkSuccess());
                location.reload()
            })
            .catch(error => dispatch(deleteArtworkUnsuccess(error)))
    }
};
