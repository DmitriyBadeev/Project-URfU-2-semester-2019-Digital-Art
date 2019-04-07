import { combineReducers } from 'redux';
import { registrationReducer } from './Registration/reducers'
import { mainReducer } from './Main/reducers'

export default combineReducers({
    registration: registrationReducer,
    main: mainReducer
});