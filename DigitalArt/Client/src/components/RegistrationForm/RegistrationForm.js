import React from 'react';

import "./Form.sass";

export default class RegistrationForm extends React.Component {

    isValidForm() {
        if (this.passwordInput.value !== this.repeatPasswordInput.value) {
            document.getElementById('error').innerText = "Пароли не совпадают!";
            return false;
        }

        if (this.emailInput.value === '' ||
            this.passwordInput.value === '' ||
            this.nameInput.value === '' ||
            this.lastNameInput.value === '') {
            document.getElementById('error').innerText = "Не все поля заполнены!";
            return false;
        }

        if (!document.getElementById("isRight").checked) {
            document.getElementById('error').innerText = "Нужно согласие с правилами сайта";
            return false;
        }

        return true;
    }

    clickHandler() {
        const isValidForm = this.isValidForm();

        if (!isValidForm) return;

        const user = {
            Email: this.emailInput.value,
            Password: this.passwordInput.value,
            Name: this.nameInput.value,
            LastName: this.lastNameInput.value,
            Role: "USER",
            Artworks: null
        };

        this.props.registration(user);
    }

    closeHandler() {
        this.props.closeRegistration();
    }

    render() {
        return <div className="Form__wrapper">
            <div className="Form__frame">
                <h1 className="Form__header">Регистрация</h1>
                <input className="input" type="email" placeholder="Email" ref={input => this.emailInput = input}/>
                <input className="input" type="password" placeholder="Пароль" ref={input => this.passwordInput = input}/>
                <input className="input" type="password" placeholder="Повторите пароль" ref={input => this.repeatPasswordInput = input}/>
                <input className="input" type="text" placeholder="Имя" ref={input => this.nameInput = input}/>
                <input className="input" type="text" placeholder="Фамилия" ref={input => this.lastNameInput = input}/>
                <div className="Form__check__container">
                    <input type="checkbox" id="isRight" className="Form__check" />
                    <label htmlFor="isRight" className="Form__label">Согласен с правилами сайта</label>
                </div>
                <div id="error" className="Form__error">{this.props.massage}</div>
                <div className="Form__btn" onClick={this.clickHandler.bind(this)}>Зарегистрироваться</div>
            </div>

            <div className="Form__close_wrapper" onClick={this.closeHandler.bind(this)}>&#10006;</div>
        </div>
    }
}

