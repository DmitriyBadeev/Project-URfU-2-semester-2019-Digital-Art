import {
    GET_ARTWORKS_SUCCESS,
    GET_ARTWORKS_UNSUCCESS,
    GET_ARTWORKS_LOADING,
    GET_ARTWORK_LOADING,
    GET_ARTWORK_SUCCESS,
    GET_ARTWORK_UNSUCCESS, OPEN_ARTWORK_PAGE, CLOSE_ARTWORK_PAGE
} from './actions';

const defaultState = {
    artworks: [],
    massage: "",
    isLoadingMain: false,
    isLoadingArt: false,
    artwork: {},
    isOpenArtwork: false,
    openArtworkId: 0
};

export const mainReducer = (state = defaultState, action) => {
    switch (action.type) {
        case GET_ARTWORKS_SUCCESS:
            return {
                ...state,
                artworks: action.payload,
                isLoadingMain: false
            };
        case GET_ARTWORKS_UNSUCCESS:
            return {
                ...state,
                massage: "Данные не были получены. Произошла ощибка :( " + action.payload,
                isLoadingMain: false
            };
        case GET_ARTWORKS_LOADING:
            return {
                ...state,
                isLoadingMain: true
            };
        case GET_ARTWORK_SUCCESS:
            return {
                ...state,
                artwork: action.payload,
                isLoadingArt: false
            };
        case GET_ARTWORK_UNSUCCESS:
            return {
                ...state,
                massage: "Данные не были получены. Произошла ощибка :( " + action.payload,
                isLoadingArt: false
            };
        case GET_ARTWORK_LOADING:
            return {
                ...state,
                isLoadingArt: true
            };
        case OPEN_ARTWORK_PAGE:
            return {
                ...state,
                isOpenArtwork: true,
                openArtworkId: action.payload
            };
        case CLOSE_ARTWORK_PAGE:
            return {
                ...state,
                isOpenArtwork: false,
                openArtworkId: 0
            }
    }

    return state;
};