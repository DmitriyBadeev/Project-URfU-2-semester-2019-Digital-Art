import React from 'react';

import './user.sass';
import Loading from "../../general/Loading/Loading"
import Link from "react-router-dom/es/Link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class User extends React.Component{

    handleSubClick() {
        const author = this.props.id;
        const user = this.props.authUserId;

        this.props.postSubscribe(author, user);
    }

    handleUnsubClick() {
        const author = this.props.id;
        const user = this.props.authUserId;

        this.props.deleteSubscribe(author, user);
    }

    render() {
        return <div className="UserWrapper">
            <div className="avatarWrapper">
                {this.props.isLoadingInfo? <Loading />:<img src={`data:image/JPEG;base64,${this.props.avatar}`}
                                                               alt="avatar"
                                                               className="avatar"
                                                               id="avatar"
                />}
            </div>

            <div className="UserInfoWrapper">
                <h2 className="User_name">{`${this.props.name} ${this.props.lastName}`}</h2>
                {this.props.status? <p className="User_status">{this.props.status}</p>: null}

                {this.props.country && this.props.city?
                    <p className="User_location"><FontAwesomeIcon icon="map-marker-alt" /> {`${this.props.country}, ${this.props.city}`}</p>
                    : this.props.country? <p className="User_location">{this.props.country}</p>
                        : this.props.country? <p className="User_location">{this.props.city}</p>
                            : null}

                {this.props.id === this.props.authUserId || !this.props.authUserId?
                    <div className="button User_subscribe_active">Количество подписчиков <span>{this.props.countSubs}</span></div>
                    :
                    this.props.isSubscribe?
                        <div className="button User_subscribe_active" onClick={this.handleUnsubClick.bind(this)}>Отписаться <span>{this.props.countSubs}</span></div>
                        :<div className="button User_subscribe" onClick={this.handleSubClick.bind(this)}>
                            Подписаться {this.props.isLoadingSubs? <span>Loading...</span>: <span>{this.props.countSubs}</span>}
                        </div>
                }

                {this.props.about? <p className="User_about"><strong>Обо мне:</strong> {this.props.about}</p>: null}

                {new Date(this.props.dateOfBirthday).getFullYear() !== 1 && this.props.dateOfBirthday?
                    <p className="User_date"><strong>Дата рождения:</strong> {new Date(this.props.dateOfBirthday).toLocaleString("ru",
                        {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}</p>: null}
            </div>

            {this.props.id === this.props.authUserId?
                <p className="UserSetting">
                    <Link to="/setting"><FontAwesomeIcon icon="cog" /> Редактировать профиль</Link>
                </p>: null}
        </div>
    }
}

