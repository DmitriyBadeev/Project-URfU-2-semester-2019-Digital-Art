import {
    DELETE_LIKE_SUCCESS,
    DELETE_LIKE_UNSUCCESS,
    GET_ARTWORK_LOADING,
    GET_ARTWORK_SUCCESS,
    GET_ARTWORK_UNSUCCESS,
    GET_LIKES_SUCCESS,
    GET_LIKES_UNSUCCESS,
    POST_LIKE_SUCCESS,
    POST_LIKE_UNSUCCESS
} from './actions';

const defaultState = {
    isLoadingArt: false,
    artwork: {
        isLikedArt: false,
        countLikes: 0
    },
    massage: ""
};

export const ArtworkPageReducer = (state = defaultState, action) => {
    switch (action.type) {
        case GET_ARTWORK_SUCCESS:
            return {
                ...state,
                artwork: {
                    ...action.payload,
                    isLikedArt: state.artwork.isLikedArt,
                    countLikes: state.artwork.countLikes
                },
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

        case GET_LIKES_SUCCESS:
            return {
                ...state,
                artwork: {
                    ...state.artwork,
                    isLikedArt: action.payload.isLiked,
                    countLikes: action.payload.countLikes
                }
            };

        case GET_LIKES_UNSUCCESS:
            return {
                ...state,
                massage: "Произошла ошибка :( " + action.payload
            };

        case POST_LIKE_SUCCESS:
            return {
                ...state,
                artwork: {
                    ...state.artwork,
                    isLikedArt: true,
                    countLikes: action.payload
                }
            };
        case POST_LIKE_UNSUCCESS:
            return {
                ...state,
                massage: "Произошла ошибка :( " + action.payload
            };
        case DELETE_LIKE_SUCCESS:
            return {
                ...state,
                artwork: {
                    ...state.artwork,
                    isLikedArt: false,
                    countLikes: action.payload
                }
            };
        case DELETE_LIKE_UNSUCCESS:
            return {
                ...state,
                massage: "Произошла ошибка :( " + action.payload
            }
    }

    return state;
};

