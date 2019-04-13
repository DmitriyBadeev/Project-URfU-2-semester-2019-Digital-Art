import React from 'react';

export default class UserInfo extends React.Component {

    componentDidMount() {
        this.props.getUserInfo();
    }

    toExit() {
        localStorage.removeItem('token');
        window.location.replace("/");
    }

    render() {
        return <div>
            <ul>
                <li>Id: {this.props.id}</li>
                <li>Email: {this.props.email}</li>
                <li>Name: {this.props.name} {this.props.lastName}</li>
            </ul>
            <button onClick={this.toExit.bind(this)}>Выход</button>
        </div>
    }
}