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

const getArtworksLoading = () => {
    return {
        type: GET_ARTWORKS_LOADING
    }
};

export const getArtworks = () => {
    return (dispatch) => {
        dispatch(getArtworksLoading());
        axios.get(MAIN_PATH + GET_ARTS_URL)
            .then(res => {
                    dispatch(getArtworksSuccess(res.data))
                }
            ).catch(error => dispatch(getArtworksUnsuccess(error)))
    }
};