import axios from 'axios';
import { MAIN_PATH, GET_ARTS_URL, GET_ART_URL } from "../../Config";

export const GET_ARTWORKS_SUCCESS = 'GET_ARTWORKS_SUCCESS';
export const GET_ARTWORKS_UNSUCCESS = 'GET_ARTWORKS_UNSUCCESS';
export const GET_ARTWORKS_LOADING = 'GET_ARTWORKS_LOADING';

export const GET_ARTWORK_SUCCESS = 'GET_ARTWORK_SUCCESS';
export const GET_ARTWORK_UNSUCCESS = 'GET_ARTWORK_UNSUCCESS';
export const GET_ARTWORK_LOADING = 'GET_ARTWORK_LOADING';

export const OPEN_ARTWORK_PAGE = 'OPEN_ARTWORK_PAGE';
export const CLOSE_ARTWORK_PAGE = 'CLOSE_ARTWORK_PAGE';

export const getArtworksSuccess = (works) => {
    return {
        type: GET_ARTWORKS_SUCCESS,
        payload: works
    }
};

const getArtworksUnsuccess = (error) => {
    return {
        type: GET_ARTWORKS_UNSUCCESS,
        payload: error
    }
};

const getArtworksLoading = () => {
    return {
        type: GET_ARTWORKS_LOADING
    }
};

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

export const openArtworkPage = (id) => {
    return {
        type: OPEN_ARTWORK_PAGE,
        payload: id
    }
};

export const closeArtworkPage = () => {
    return {
        type: CLOSE_ARTWORK_PAGE
    }
};

export const getArtworks = () => {
    return (dispatch) => {
        dispatch(getArtworksLoading());
        axios.get(MAIN_PATH + GET_ARTS_URL)
            .then(res => {
                    dispatch(getArtworksSuccess(res.data))
            })
            .catch(error => dispatch(getArtworksUnsuccess(error)))
    }
};

export const getUserArtwork = id => {
    return (dispatch) => {
        dispatch(getArtworkLoading());
        console.log("action " + id);
        axios.get(MAIN_PATH+GET_ART_URL(id))
            .then(res => {
                dispatch(getArtworkSuccess(res.data))
            })
            .catch(error => dispatch(getArtworkUnsuccess(error)))
    }
};