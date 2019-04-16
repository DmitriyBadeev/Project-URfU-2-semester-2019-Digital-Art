import React from 'react';
import {Link} from "react-router-dom";

import "./userInfo.sass";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class UserInfo extends React.Component {

    componentDidMount() {
        this.props.getUserInfo();
    }

    toExit() {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        window.location.replace("/");
    }

    render() {
        return <div className="UserInfo__wrapper">
            <div className="Header__Btn">
                <Link to="/profile">
                    <FontAwesomeIcon icon="user"/> {this.props.isLoading? <span>Loading</span>: `${this.props.name} ${this.props.lastName}`}
                </Link>
            </div>
            <div className="Header__Btn" onClick={this.toExit.bind(this)}>Выход</div>
        </div>
    }
}