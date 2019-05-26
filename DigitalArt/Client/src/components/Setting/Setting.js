import React from 'react';

import './setting.sass';
import Loading from '../general/Loading/Loading';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import Dropzone from '../general/Dropzone/Dropzone'
import {Redirect} from "react-router-dom";

export default class Setting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoadFile: false,
            avatar: props.authUser.avatar,
        }
    }

    clickHandler() {
        const formData = new FormData();

        if (this.nameInput.value !== "")
            formData.append("Name", this.nameInput.value);
        else {
            document.getElementById("Setting_massage").innerText = "Введите имя";
            return
        }

        if (this.lastNameInput.value !== "")
            formData.append("LastName", this.lastNameInput.value);
        else {
            document.getElementById("Setting_massage").innerText = "Введите фамилию";
            return
        }

        if (this.emailInput.value !== "")
            formData.append("Email", this.emailInput.value);
        else {
            document.getElementById("Setting_massage").innerText = "Введите email";
            return
        }

        formData.append("Country", this.countryInput.value);
        formData.append("City", this.cityInput.value);
        formData.append("Avatar", this.state.avatar);
        formData.append("Id", this.props.authUser.id);
        formData.append("DateOfBirthDay", this.dateOfBirthdayInput.value);
        formData.append("Status", this.statusInput.value);
        formData.append("About", this.aboutInput.value);

        this.props.putAuthUser(formData);
    }

    getCurrentDateOfBirthday() {
        let currentDate = new Date(this.props.authUser.dateOfBirthday);

        return currentDate.getFullYear() + '-' + ('0' + (currentDate.getMonth() + 1)).slice(-2) + '-' + ('0' + currentDate.getDate()).slice(-2);
    }

    changeType(e) {
        if (e.target.type === "text")
            e.target.type = "date";
        else {
            e.target.value = this.getCurrentDateOfBirthday(e.target.value);
            e.type = "text";
        }
    }

    loadHandler() {
        this.setState({isLoadFile: !this.state.isLoadFile})
    }

    onFileAdded(file) {
        this.setState({isLoadFile: !this.state.isLoadFile});

        setTimeout(() => {
            const avatar = document.getElementById("Setting_avatar");
            const reader = new FileReader();

            reader.onloadend = () => avatar.src = reader.result;

            file? reader.readAsDataURL(file): avatar.src = "";

            this.setState({avatar: file})
        }, 0)
    }

    resetInfo() {
        location.reload();
    }

    render() {

        const {isRedirect} = this.props;

        if (isRedirect) {
            this.props.redirected();
            return <Redirect to={`/profile/${this.props.authUser.id}`} />
        }

        return <div className="Setting__container">
            <h1 className="Setting__header">Редактирование профиля</h1>
            <div className="Setting__form">
                <div className="Setting__fields_wrapper">
                    <div className="Setting__field">
                        <label htmlFor="email" className="Setting__label">Email: </label>
                        <input type="email"
                               id="email"
                               className="input Setting__input"
                               defaultValue={this.props.authUser.email}
                               placeholder="Введите свой email"
                               ref={input =>  this.emailInput = input}
                        />
                    </div>

                    <div className="Setting__field">
                        <label htmlFor="name" className="Setting__label">Имя: </label>
                        <input type="text"
                               id="name"
                               className="input Setting__input"
                               placeholder="Введите ваше имя"
                               defaultValue={this.props.authUser.name}
                               ref={input =>  this.nameInput = input}
                        />
                    </div>

                    <div className="Setting__field">
                        <label htmlFor="lastName" className="Setting__label">Фамилия: </label>
                        <input type="text"
                               id="lastName"
                               className="input Setting__input"
                               placeholder="Введите вашу фамилию"
                               defaultValue={this.props.authUser.lastName}
                               ref={input =>  this.lastNameInput = input}
                        />
                    </div>

                    <div className="Setting__field">
                        <label htmlFor="dateOfBirthday" className="Setting__label">Дата рождения: </label>
                        <input type="date"
                           defaultValue={this.getCurrentDateOfBirthday()}
                           id="dateOfBirthday"
                           className="input Setting__input"
                           ref={input =>  this.dateOfBirthdayInput = input}
                        />
                    </div>

                    <div className="Setting__field">
                        <label htmlFor="country" className="Setting__label">Страна: </label>
                        <input type="text"
                               id="county"
                               className="input Setting__input"
                               placeholder="В какой стране вы живете?"
                               defaultValue={this.props.authUser.country}
                               ref={input =>  this.countryInput = input}
                        />
                    </div>

                    <div className="Setting__field">
                        <label htmlFor="city" className="Setting__label">Город: </label>
                        <input type="text"
                               id="city"
                               className="input Setting__input"
                               placeholder="Из какого вы города?"
                               defaultValue={this.props.authUser.city}
                               ref={input =>  this.cityInput = input}
                        />
                    </div>

                    <div className="Setting__field">
                        <label htmlFor="status" className="Setting__label">Работа: </label>
                        <input type="text"
                               id="status"
                               className="input Setting__input"
                               placeholder="Кто вы? Чем занимаетесь?"
                               defaultValue={this.props.authUser.status}
                               ref={input =>  this.statusInput = input}
                        />
                    </div>

                    <div className="Setting__field">
                        <label htmlFor="about" className="Setting__label">О вас: </label>
                        <textarea id="about"
                                  className="input Edit__about"
                                  placeholder="Расскажите немного о себе"
                                  defaultValue={this.props.authUser.about}
                                  ref={input =>  this.aboutInput = input}
                        />
                    </div>
                    <div className="Setting_massage" id="Setting_massage">{this.props.massage}</div>
                    <div className="Setting__btn_group">
                        <div className="alt-button Setting__btn" onClick={this.resetInfo.bind(this)}>Сбросить</div>
                        <div className="button Setting__btn" onClick={this.clickHandler.bind(this)}>Изменить данные</div>
                    </div>
                </div>
                <div className="Setting__avatar">
                    <div className="Setting__avatar_wrapper">
                        {this.props.isLoadingInfo? <Loading />:
                                this.state.isLoadFile?  <Dropzone onFileAdded={this.onFileAdded.bind(this)} /> :
                            <img src={`data:image/JPEG;base64,${this.props.authUser.avatar}`}
                                                    alt="avatar"
                                                    className="Setting_avatar"
                                                    id="Setting_avatar"
                            />}
                        {this.state.isLoadFile? null : <div className="Setting__cover" onClick={this.loadHandler.bind(this)}>
                            <FontAwesomeIcon icon="cog" />&nbsp;
                            <span className="Setting__cover_span">Изменить аватар</span>
                        </div>}
                    </div>
                    <p className="Setting__warning">* рекомендуется загружать квадратное изображение</p>
                </div>
            </div>
        </div>
    }
}