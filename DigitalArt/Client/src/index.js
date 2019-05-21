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
const Setting           =   React.lazy(() => import("./components/Setting/SettingContainer"));

ReactDOM.render(
    <BrowserRouter>
        <App>
            <Suspense fallback={<Loading />}>
                <Switch>
                    <Route exact path="/" component={props => <Main {...props} />} />
                    <Route exact path="/profile/:userId" component={props => <ProfilePage {...props}/>} />
                    <Route path="/add-artwork" component={props => <AddArtworkPage {...props}/>} />
                    <Route exact path="/artwork/:artId" component={props => <ArtworkPage {...props}/>} />
                    <Route exact path="/setting" component={props => <Setting {...props} />} />
                    <Route path="*" component={props => <NotFound {...props}/>} />
                </Switch>
            </Suspense>
        </App>
    </BrowserRouter>,
document.getElementById("root"));