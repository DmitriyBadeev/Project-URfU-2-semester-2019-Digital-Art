import React from 'react';

export default class AuthForm extends React.Component {

    isValidForm() {
        if (this.emailInput.value === "" || this.passwordInput.value === "") {
            document.getElementById('error').innerText = "Введите данные!";
            return false;
        }

        return true;
    }

    clickHandler() {
        const isValid = this.isValidForm();

        if (!isValid)
            return;

        const authData = {
            Login: this.emailInput.value,
            Password: this.passwordInput.value
        };

        const isRemember = document.getElementById("isRemember").checked;

        this.props.authorization(authData, isRemember);
    }

    closeHandler() {
        this.props.closeAuth();
    }

    render() {
        return <div className="Form__wrapper">
            <div className="Form__frame">
                <h1 className="Form__header">Вход</h1>
                <input className="input" type="email" placeholder="Email" ref={input => this.emailInput = input}/>
                <input className="input" type="password" placeholder="Пароль" ref={input => this.passwordInput = input}/>
                <div className="Form__check__container">
                    <input type="checkbox" id="isRemember" className="Form__check" />
                    <label htmlFor="isRemember" className="Form__label">Запомнить меня?</label>
                </div>
                <div id="error" className="Form__error">{this.props.massage}</div>
                <div className="Form__btn" onClick={this.clickHandler.bind(this)}>Войти</div>

                <div className="Form__close_wrapper" onClick={this.closeHandler.bind(this)}>&#10006;</div>
            </div>
        </div>
    }
}