import React from 'react';

import './user.sass';
import Loading from "../../general/Loading/Loading"
import Link from "react-router-dom/es/Link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class User extends React.Component{

    handleFile(e) {
        const photo = e.target.files[0];

        const avatar = document.getElementById("avatar");

        const reader = new FileReader();

        reader.onloadend = () => avatar.src = reader.result;

        photo? reader.readAsDataURL(photo): avatar.src = `data:image/JPEG;base64,${this.props.avatar}`;
    }

    handleChange() {
         const changeBlock = document.getElementById("User__selectImg");

         if (changeBlock.style.display === "none")
            changeBlock.style.display = "block";
         else
             changeBlock.style.display = "none"
    }

    handleSave() {

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


                <div className="button User_subscribe">Подписаться <span>165</span></div>

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

