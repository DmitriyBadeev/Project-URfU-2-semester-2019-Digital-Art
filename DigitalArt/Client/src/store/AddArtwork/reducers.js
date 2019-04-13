import { POST_ARTWORK_UNSUCCESS,
         POST_ARTWORK_SUCCESS,
         IS_REDIRECTED } from "./actions";

const defaultState = {
    massage: "",
    isRedirect: false
};

export const addArtworkReducer = (state = defaultState, action) => {
    switch (action.type) {
        case POST_ARTWORK_SUCCESS:
            return {
                ...state,
                massage: action.payload,
                isRedirect: true
            };
        case POST_ARTWORK_UNSUCCESS:
            return {
                ...state,
                massage: action.payload
            };
        case IS_REDIRECTED:
            return {
                ...state,
                isRedirect: false
            }
    }

    return state;
};