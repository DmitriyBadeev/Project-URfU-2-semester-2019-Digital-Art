import React from 'react';

export default class RegistrationForm extends React.Component {

    clickHandler() {
        this.props.setNameInState(this.nameInput.value);
        this.props.setPasswordInState(this.passwordInput.value);
        this.props.setEmailInState(this.emailInput.value);
    }

    render() {
        return <div>
            <input type="text" placeholder="Email" ref={input => this.emailInput = input} /> <br />
            <input type="text" placeholder="Password" ref={input => this.passwordInput = input}/> <br />
            <input type="text" placeholder="Name" ref={input => this.nameInput = input}/> <br />
            <button onClick={this.clickHandler.bind(this)}>Зарегистрироваться</button>
            <hr />
            {`Email: ${this.props.email} Password: ${this.props.password} Name: ${this.props.name}`}
        </div>
    }
}

