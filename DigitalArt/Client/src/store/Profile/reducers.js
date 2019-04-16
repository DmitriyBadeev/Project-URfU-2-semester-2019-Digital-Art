import { DELETE_ARTWORK_UNSUCCESS,
         DELETE_ARTWORK_SUCCESS,
         DELETE_ARTWORK_LOADING } from "./actions";

const defaultState = {
    massage: "",
    isLoading: false
};

export const profileReducer = (state = defaultState, action) => {
    switch (action.type) {
        case DELETE_ARTWORK_SUCCESS:
            return {
                ...state,
                isLoading: false,
                massage: action.payload
            };
        case DELETE_ARTWORK_UNSUCCESS:
            return {
                ...state,
                isLoading: false,
                massage: action.payload
            };
        case DELETE_ARTWORK_LOADING:
            return{
                ...state,
                isLoading: true
            }
    }

    return state;
};
