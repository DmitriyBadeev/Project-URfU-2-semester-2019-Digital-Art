import React from 'react';
import {Link} from "react-router-dom";

import "./userInfo.sass";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class UserInfo extends React.Component {

    componentDidMount() {
        this.props.getAuthUser();
    }

    toExit() {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        window.location.replace("/");
    }

    render() {
        return <div className="UserInfo__wrapper">
            <div className="Header__Btn">
                <Link to={`/profile/${this.props.authUser.id}`}>
                    <FontAwesomeIcon icon="user"/> {this.props.isLoading? <span>Loading</span>: `${this.props.authUser.name} ${this.props.authUser.lastName}`}
                </Link>
            </div>
            <div className="Header__Btn" onClick={this.toExit.bind(this)}>Выход</div>
        </div>
    }
}