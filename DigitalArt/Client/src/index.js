import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import "./app.sass"

const Main              =   React.lazy(() => import("./components/Main/MainContainer"));
const RegistrationForm  =   React.lazy(() => import("./components/RegistrationForm/RegistrationFormContainer"));
const NotFound          =   React.lazy(() => import("./components/NotFound"));
const AuthForm          =   React.lazy(() => import("./components/AuthForm/AuthFormContainer"));
const ProfilePage       =   React.lazy(() => import("./components/Profile/ProfilePageContainer"));
const AddArtworkPage    =   React.lazy(() => import("./components/AddArtwork/AddArtworkPageContainer"));

//import Main from "./components/Main/MainContainer";
//import RegistrationForm from "./components/RegistrationForm/RegistrationFormContainer";
//import NotFound from "./components/NotFound";
//import AuthFormContainer from "./components/AuthForm/AuthFormContainer";
//import ProfilePage from "./components/Profile/ProfilePageContainer";
//import AddArtworkPage from "./components/AddArtwork/AddArtworkPageContainer";

ReactDOM.render(
    <BrowserRouter>
        <App>
            <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                    <Route exact path="/" component={Main} />
                    <Route path="/registration" component={RegistrationForm} />
                    <Route path="/authorization" component={AuthForm} />
                    <Route path="/profile" component={ProfilePage}/>
                    <Route path="/add-artwork" component={AddArtworkPage}/>
                    <Route path="*" component={NotFound} />
                </Switch>
            </Suspense>
        </App>
    </BrowserRouter>,
document.getElementById("root"));


