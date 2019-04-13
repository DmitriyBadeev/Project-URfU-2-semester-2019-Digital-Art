import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Main from "./components/Main/Main";
import RegistrationForm from "./components/RegistrationForm/RegistrationFormContainer";
import NotFound from "./components/NotFound";
import AuthFormContainer from "./components/AuthForm/AuthFormContainer";
import ProfilePage from "./components/Profile/ProfilePageContainer";
import AddArtworkPage from "./components/AddArtwork/AddArtworkPageContainer";

ReactDOM.render(
    <BrowserRouter>
        <App>
            <Switch>
                <Route exact path="/" component={Main} />
                <Route path="/registration" component={RegistrationForm} />
                <Route path="/authorization" component={AuthFormContainer} />
                <Route path="/profile" component={ProfilePage}/>
                <Route path="/add-artwork" component={AddArtworkPage}/>
                <Route path="*" component={NotFound} />
            </Switch>
        </App>
    </BrowserRouter>,
document.getElementById("root"));


