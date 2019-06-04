import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { getArtworksElse } from './store/Main/actions';

import rootReducer from './store/rootReducer';

import Header from "./components/Header/HeaderContainer";

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faDiceD6, faThumbsUp, faCommentAlt, faEye, faCog, faFileDownload, faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';
import { PATH } from "./Config";

library.add(faUser, faDiceD6, faThumbsUp, faCommentAlt, faEye, faCog, faFileDownload, faMapMarkerAlt);

window.onscroll = () => {
    if (location.href === PATH) {
        let scrolled = window.pageYOffset || document.documentElement.scrollTop;
        let scrollHeight = document.documentElement.offsetHeight;

        let state = store.getState();
        const sortParams = state.main.sortParams;
        const loadedArts = state.main.loadedArts;
        const isLoading = state.main.isLoadingMain || state.main.isLoadingElse;
        const isEnd = state.main.isLastLoad;
        const authId = state.userInfo.authUser.id;

        if (scrolled > scrollHeight - 1400 && !isLoading && !isEnd) {
            if (authId && sortParams === "Моя лента")
                store.dispatch(getArtworksElse(sortParams, loadedArts, authId));
            else
                store.dispatch(getArtworksElse(sortParams, loadedArts, 0));
        }
    }

    if (location.href.startsWith('http://localhost:8080/profile')) {

    }
};

const App = ({ children }) => (
     <Provider store={store}>
        <Header />
         {children}
     </Provider>
);

export default App;




