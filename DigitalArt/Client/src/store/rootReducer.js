import { combineReducers } from 'redux';
import { registrationReducer } from './Registration/reducers'
import { authorizationReducer } from "./Auth/reducers";
import { mainReducer } from './Main/reducers';
import { headerReducer } from "./Header/reducers";
import { userInfoReducer } from "./Header/UserInfo/reducers";
import { addArtworkReducer } from "./AddArtwork/reducers";
import { profileReducer } from "./Profile/reducers";
import { ArtworkPageReducer } from "./ArtworkPage/reducers";

export default combineReducers({
    registration: registrationReducer,
    main: mainReducer,
    authorization: authorizationReducer,
    header: headerReducer,
    userInfo: userInfoReducer,
    addArtwork: addArtworkReducer,
    profile: profileReducer,
    artworkPage: ArtworkPageReducer
});