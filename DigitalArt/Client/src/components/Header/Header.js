import React from 'react';
import {Link} from "react-router-dom";
import RegistrationForm from "../RegistrationForm/RegistrationFormContainer";
import AuthForm from "../AuthForm/AuthFormContainer";
import UserInfo from "./UserInfo/UserInfoContainer";

import "./header.sass";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ArtworkPage from "../ArtworkPage/ArtworkPageContainer";

export default class Footer extends React.Component {

    registrationClick() {
        if (this.props.isOpenRegistration)
            this.props.closeRegistration();
        else
            this.props.openRegistration();
    }

    authClick() {
        if (this.props.isOpenAuth)
            this.props.closeAuth();
        else
            this.props.openAuth();
    }

    render() {
        return <header className="Header__header">
            <div className="Header__logo_wrapper">
                <Link to="/">
                    <p className="Header__logo"><FontAwesomeIcon icon="dice-d6"/> Digital Art</p>
                </Link>
            </div>


            <div className="Header__userInfo">
                {!this.props.isAuth? <div className="Header__Btn" onClick={this.registrationClick.bind(this)}>
                    <p>Зарегистрироваться</p>
                </div>:null}

                {!this.props.isAuth? <div className="Header__Btn" onClick={this.authClick.bind(this)}>
                    <p>Войти</p>
                </div>: null}

                {this.props.isOpenRegistration && !this.props.isAuth? <RegistrationForm />: null}
                {this.props.isOpenAuth && !this.props.isAuth? <AuthForm />: null}

                {this.props.isAuth? <UserInfo /> : null}
                {this.props.isOpenArtwork? <ArtworkPage />: null}
            </div>

        </header>
    }
}