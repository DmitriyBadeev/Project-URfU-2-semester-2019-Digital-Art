import axios from 'axios';
import {MAIN_PATH, GET_ARTS_URL, GET_ARTS_ELSE_URL, SEARCH_ARTS_URL} from "../../Config";

export const GET_ARTWORKS_SUCCESS = 'GET_ARTWORKS_SUCCESS';
export const GET_ARTWORKS_UNSUCCESS = 'GET_ARTWORKS_UNSUCCESS';
export const GET_ARTWORKS_LOADING = 'GET_ARTWORKS_LOADING';

export const OPEN_ARTWORK_PAGE = 'OPEN_ARTWORK_PAGE';
export const CLOSE_ARTWORK_PAGE = 'CLOSE_ARTWORK_PAGE';

export const UPDATE_COUNT_LIKE = 'UPDATE_COUNT_LIKE';
export const UPDATE_COUNT_COMMENT = 'UPDATE_COUNT_COMMENT';

export const GET_ARTWORKS_ELSE_SUCCESS = 'GET_ARTWORKS_ELSE_SUCCESS';
export const GET_ARTWORKS_ELSE_UNSUCCESS = 'GET_ARTWORKS_ELSE_UNSUCCESS';
export const GET_ARTWORKS_ELSE_LOADING = 'GET_ARTWORKS_ELSE_LOADING';

export const SEARCH_ARTS_SUCCESS = 'SEARCH_ARTS_SUCCESS';
export const SEARCH_ARTS_UNSUCCESS = 'SEARCH_ARTS_UNSUCCESS';

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

export const getArtworks = (sortParams, id = 0) => {

    const options = {
        params: {
            sortParams: sortParams,
            id: id
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

const getArtworksElseSuccess = (data) => {
    return {
        type: GET_ARTWORKS_ELSE_SUCCESS,
        payload: data
    }
};

const getArtworksElseUnsuccess = (error) => {
    return {
        type: GET_ARTWORKS_ELSE_UNSUCCESS,
        payload: error
    }
};

const getArtworksElseLoading = () => {
    return {
        type: GET_ARTWORKS_ELSE_LOADING
    }
};

export const getArtworksElse = (sortParams, countLoaded, id) => {

    const options = {
        params: {
            sortParams: sortParams,
            countLoaded: countLoaded,
            id: id
        }
    };

    return dispatch => {
        dispatch(getArtworksElseLoading());
        axios.get(MAIN_PATH + GET_ARTS_ELSE_URL, options)
            .then(res => {
                dispatch(getArtworksElseSuccess(res.data));
            })
            .catch(error => dispatch(getArtworksElseUnsuccess(error)))
    }
};

export const searchArtwork = (data) => {

    const options = {
        params: {
            data: data,
        }
    };

    return dispatch => {
        dispatch(getArtworksLoading());
        console.log(data);
        axios.get(MAIN_PATH+SEARCH_ARTS_URL, options)
            .then(res => {
                dispatch(searchArtworkSuccess(res.data));
            })
            .catch(error => dispatch(searchArtworkUnsuccess(error)));
    }
};

const searchArtworkSuccess = (arts) => {
    return {
        type: SEARCH_ARTS_SUCCESS,
        payload: arts
    }
};

const searchArtworkUnsuccess = (error) => {
    return {
        type: SEARCH_ARTS_UNSUCCESS,
        payload: error
    }
};


