import axios from 'axios';
import { MAIN_PATH, POST_ART_URL } from "../../Config";

export const POST_ARTWORK_SUCCESS = "POST_ARTWORK_SUCCESS";
export const POST_ARTWORK_UNSUCCESS = "POST_ARTWORK_UNSUCCESS";
export const IS_REDIRECTED = "IS_REDIRECTED";

const postArtworkSuccess = () => {
    return {
        type: POST_ARTWORK_SUCCESS,
        payload: "Работа успешно опубликована",
    }
};

const postArtworkUnsuccess = (error) => {
    return {
        type: POST_ARTWORK_UNSUCCESS,
        payload: "Произошла ошибка :( " + error
    }
};

export const isRedirected = () => {
    return {
        type: IS_REDIRECTED,
    }
};

export const postArtwork = (artwork) => {
    return dispatch => {
        axios.post(MAIN_PATH+POST_ART_URL, artwork)
            .then(res => {
                console.log(res.data);
                dispatch(postArtworkSuccess());
            })
            .catch(error => dispatch(postArtworkUnsuccess(error)));
    }
};