import { GET_ARTWORKS_SUCCESS } from './actions';

const defaultState = {
    artworks: []
};

export const mainReducer = (state = defaultState, action) => {
    switch (action.type) {
        case GET_ARTWORKS_SUCCESS:
            return {
                ...state,
                artworks: action.payload
            }
    }

    return state;
};