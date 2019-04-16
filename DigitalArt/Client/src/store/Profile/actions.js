import axios from 'axios';
import {DELETE_ART_URL, MAIN_PATH} from "../../Config";

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

export const deleteArtwork = (id) => {
    return dispatch => {
        dispatch(deleteArtworkLoading());
        console.log(id);
        axios.delete(MAIN_PATH+DELETE_ART_URL(id))
            .then(res => {
                console.log(res.data);
                dispatch(deleteArtworkSuccess());
                window.location.replace("/profile");
            })
            .catch(error => dispatch(deleteArtworkUnsuccess(error)))
    }
};
