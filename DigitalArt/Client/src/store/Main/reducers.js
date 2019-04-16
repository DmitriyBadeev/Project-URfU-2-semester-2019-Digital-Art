import { GET_ARTWORKS_SUCCESS, GET_ARTWORKS_UNSUCCESS, GET_ARTWORKS_LOADING } from './actions';

const defaultState = {
    artworks: [],
    massage: "",
    isLoading: false
};

export const mainReducer = (state = defaultState, action) => {
    switch (action.type) {
        case GET_ARTWORKS_SUCCESS:
            return {
                ...state,
                artworks: action.payload,
                isLoading: false
            };
        case GET_ARTWORKS_UNSUCCESS:
            return {
                ...state,
                massage: "Данные не были получены. Произошла ощибка :( " + action.payload,
                isLoading: false
            };
        case GET_ARTWORKS_LOADING:
            return {
                ...state,
                isLoading: true
            }
    }

    return state;
};