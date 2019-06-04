import {
    GET_ARTWORKS_SUCCESS,
    GET_ARTWORKS_UNSUCCESS,
    GET_ARTWORKS_LOADING,
    OPEN_ARTWORK_PAGE,
    CLOSE_ARTWORK_PAGE,
    GET_ARTWORKS_ELSE_LOADING,
    GET_ARTWORKS_ELSE_UNSUCCESS,
    GET_ARTWORKS_ELSE_SUCCESS,
    SEARCH_ARTS_SUCCESS,
    SEARCH_ARTS_UNSUCCESS
} from './actions';

const defaultState = {
    artworks: [],
    massage: "",
    isLoadingMain: false,
    isLoadingArt: false,
    isOpenArtwork: false,
    openArtworkId: 0,
    isLoadingElse: false,
    loadedArts: 0,
    isLastLoad: false,
    sortParams: ""
};

export const mainReducer = (state = defaultState, action) => {
    switch (action.type) {
        case GET_ARTWORKS_SUCCESS:
            return {
                ...state,
                artworks: action.payload.arts,
                isLoadingMain: false,
                isLastLoad: false,
                loadedArts: action.payload.arts.length,
                sortParams: action.payload.sort
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
            };

        case GET_ARTWORKS_ELSE_SUCCESS:
            console.log(action.payload);
            return {
                ...state,
                isLoadingElse: false,
                loadedArts: action.payload.loadedArts,
                isLastLoad: action.payload.isLast,
                artworks: [
                    ...state.artworks,
                    ...action.payload.arts
                ]
            };

        case GET_ARTWORKS_ELSE_LOADING:
            return {
                ...state,
                isLoadingElse: true
            };

        case GET_ARTWORKS_ELSE_UNSUCCESS:
            return {
                ...state,
                isLoadingElse: false,
                massage: "Данные не были получены. Произошла ощибка :( " + action.payload
            };

        case SEARCH_ARTS_SUCCESS:
            return {
                ...state,
                artworks: action.payload,
                isLoadingMain: false,
                isLastLoad: true,
                loadedArts: action.payload.length
            };

        case SEARCH_ARTS_UNSUCCESS:
            return {
                ...state,
                isLoadingMain: false,
                massage: "Данные не были получены. Произошла ощибка :( " + action.payload
            }
    }

    return state;
};