import React from 'react';

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

    render() {
        return <div>
            <input type="email" placeholder="Email" ref={input => this.emailInput = input} /> <br />
            <input type="password" placeholder="Password" ref={input => this.passwordInput = input}/> <br />
            <input type="password" placeholder="Repeat password" ref={input => this.repeatPasswordInput = input}/> <br />
            <input type="text" placeholder="Name" ref={input => this.nameInput = input}/> <br />
            <input type="text" placeholder="LastName" ref={input => this.lastNameInput = input}/> <br />
            <button onClick={this.clickHandler.bind(this)}>Зарегистрироваться</button>

            <hr />

            <div id="error">{this.props.massage}</div>
        </div>
    }
}

