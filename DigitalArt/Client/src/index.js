import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Main from "./components/Main/Main";
import RegistrationForm from "./components/RegistrationForm/RegistrationFormContainer";
import HelloWorld from "./components/HelloWorld";
import NotFound from "./components/NotFound";

ReactDOM.render(
    <BrowserRouter>
        <App>
            <Switch>
                <Route exact path="/" component={Main} />
                <Route path="/registration" component={RegistrationForm} />
                <Route path="/helloworld" component={HelloWorld} />
                <Route path="*" component={NotFound} />
            </Switch>
        </App>
    </BrowserRouter>,
document.getElementById("root"));


