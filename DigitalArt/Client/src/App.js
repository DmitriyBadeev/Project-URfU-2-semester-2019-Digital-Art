import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootReducer from './store/rootReducer';

import Header from "./components/Header/HeaderContainer";
import Footer from "./components/Footer/Footer";

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faDiceD6, faThumbsUp, faCommentAlt } from '@fortawesome/free-solid-svg-icons';

library.add(faUser, faDiceD6, faThumbsUp, faCommentAlt);

const App = ({ children }) => (
     <Provider store={store}>
        <Header />
         {children}

     </Provider>
);

export default App;




