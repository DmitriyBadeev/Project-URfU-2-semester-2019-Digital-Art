import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import Loading from "./components/general/Loading/Loading"
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import "./app.sass"

const Main              =   React.lazy(() => import("./components/Main/MainContainer"));
const NotFound          =   React.lazy(() => import("./components/NotFound"));
const ProfilePage       =   React.lazy(() => import("./components/Profile/ProfilePageContainer"));
const AddArtworkPage    =   React.lazy(() => import("./components/AddArtwork/AddArtworkPageContainer"));
const ArtworkPage       =   React.lazy(() => import("./components/ArtworkPage/ArtworkPageContainer"));

//import ArtworkPage from "./components/ArtworkPage/ArtworkPageContainer";

//import Main from "./components/Main/MainContainer";
//import RegistrationForm from "./components/RegistrationForm/RegistrationFormContainer";
//import NotFound from "./components/NotFound";
//import AuthFormContainer from "./components/AuthForm/AuthFormContainer";
//import ProfilePage from "./components/Profile/ProfilePageContainer";
//import AddArtworkPage from "./components/AddArtwork/AddArtworkPageContainer";

ReactDOM.render(
    <BrowserRouter>
        <App>
            <Suspense fallback={<Loading />}>
                <Switch>
                    <Route exact path="/" component={props => <Main {...props} />} />
                    <Route path="/profile" component={props => <ProfilePage {...props}/>} />
                    <Route path="/add-artwork" component={props => <AddArtworkPage {...props}/>} />
                    <Route path="/:id" component={props => <ArtworkPage {...props}/>} />
                    <Route path="*" component={props => <NotFound {...props}/>} />
                </Switch>
            </Suspense>
        </App>
    </BrowserRouter>,
document.getElementById("root"));


