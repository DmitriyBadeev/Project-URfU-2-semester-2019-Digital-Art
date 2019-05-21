export const OPEN_ARTWORK_PAGE = 'OPEN_ARTWORK_PAGE';
export const CLOSE_ARTWORK_PAGE = 'CLOSE_ARTWORK_PAGE';

export const UPDATE_COUNT_LIKE = 'UPDATE_COUNT_LIKE';
export const UPDATE_COUNT_COMMENT = 'UPDATE_COUNT_COMMENT';

const getArtworksLoading = () => {
    return {
        type: GET_ARTWORKS_LOADING
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

import axios from 'axios';
import { MAIN_PATH, GET_ARTS_URL } from "../../Config";

export const GET_ARTWORKS_SUCCESS = 'GET_ARTWORKS_SUCCESS';
export const GET_ARTWORKS_UNSUCCESS = 'GET_ARTWORKS_UNSUCCESS';
export const GET_ARTWORKS_LOADING = 'GET_ARTWORKS_LOADING';

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

export const getArtworks = (sortParams) => {

    const options = {
        params: {
            sortParams: sortParams
        }
    };

    return dispatch => {
        dispatch(getArtworksLoading());
        axios.get(MAIN_PATH + GET_ARTS_URL, options)
            .then(res => {
                    dispatch(getArtworksSuccess(res.data))
            })
            .catch(error => dispatch(getArtworksUnsuccess(error)))
    }
};



