import React from 'react';
import {Link} from "react-router-dom";
import RegistrationForm from "../RegistrationForm/RegistrationFormContainer";
import AuthForm from "../AuthForm/AuthFormContainer";
import UserInfo from "./UserInfo/UserInfoContainer";

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
        return <div>
            <Link to="/"><h1>Главная</h1></Link>
            <hr />
            {!this.props.isAuth? <button onClick={this.registrationClick.bind(this)}>Регистрация</button>:null}
            {!this.props.isAuth? <button onClick={this.authClick.bind(this)}>Авторизация</button>: null}

            {this.props.isOpenRegistration && !this.props.isAuth? <RegistrationForm />: null}
            {this.props.isOpenAuth && !this.props.isAuth? <AuthForm />: null}

            {this.props.isAuth? <UserInfo /> : null}
            {this.props.isAuth? <Link to="/profile">Мой профиль</Link> : null}

            <hr />
        </div>
    }
}