import React from 'react';

export default class AuthForm extends React.Component {

    clickHandler() {
        const authData = {
            Login: this.emailInput.value,
            Password: this.passwordInput.value
        };

        this.props.authorization(authData);
    }

    render() {
        return <div>
                <input type="email" placeholder="Email" ref={input => this.emailInput = input}/> <br />
                <input type="password" placeholder="Password" ref={input => this.passwordInput = input}/> <br />
                <button onClick={this.clickHandler.bind(this)}>Войти</button>
            <hr />
            <div id="error">{this.props.massage}</div>
        </div>
    }
}