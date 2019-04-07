import axios from 'axios';
import { MAIN_PATH } from "../../Config";

export const GET_ARTWORKS_SUCCESS = 'GET_ARTWORKS_SUCCESS';

export const getArtworksSuccess = (works) => {
    return {
        type: GET_ARTWORKS_SUCCESS,
        payload: works
    }
};

export const getArtworks = (url) => {
    return (dispatch) => {
        axios.get(MAIN_PATH + url)
            .then(res => {
                    //Console.log(res.data);
                    dispatch(getArtworksSuccess(res.data))
                }
            )
    }
};