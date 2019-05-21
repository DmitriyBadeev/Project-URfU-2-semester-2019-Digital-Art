import React from 'react';

import { Redirect } from "react-router-dom";
import "./addArtworkPage.sass";
import Dropzone from "../general/Dropzone/Dropzone";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default class AddArtworkPage extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            isLoadArt: false,
            art: null
        }
    }

    closeArt() {
        this.setState({isLoadArt: !this.state.isLoadArt, art: null});
    }

    getSelectedTags() {
        let selectedTags = [];

        for (let i = 1; i <= 11; i++) {
            let tag = document.getElementById(`Add_${i}`);
            if (tag.checked)
                selectedTags.push(tag.value);
        }

        return selectedTags;
    }


    clickHandler() {
        const file = this.state.art;
        const formData = new FormData();
        const tags = this.getSelectedTags();
        console.log(tags);

        formData.append("Name", this.nameInput.value);
        formData.append("IdAuthor", this.props.idAuthUser);
        formData.append("Tags", tags.toString());
        formData.append("Description", this.descriptionInput.value);
        formData.append("File", file);

        this.props.postArtwork(formData);
    }

    onFileAdded(file) {
        this.setState({isLoadArt: !this.state.isLoadArt});

        setTimeout(() => {
            const art = document.getElementById("AddArt_art");
            const reader = new FileReader();

            reader.onloadend = () => art.src = reader.result;

            file? reader.readAsDataURL(file): art.src = "";

            this.setState({art: file})
        }, 0)
    }

    render() {
        const {isRedirect} = this.props;

        if (isRedirect) {
            this.props.isRedirected();
            return <Redirect to={`/profile/${this.props.idAuthUser}`} />
        }

        return <div className="AddArtPage_container">

            <h1 className="AddArtPage_header">Добавление работы</h1>
            <div className="AddArtPage_wrapper">
                <div className="AddArtPage_fieldsWrapper">
                    <div className="AddArtPage_field">
                        <label htmlFor="addArt_name" className="AddArtPage_label">Название</label>
                        <input type="text" placeholder="Название" id="addArt_name" ref={input => this.nameInput = input} className="input AddArtPage_input"/>
                    </div>

                    <div className="AddArtPage_field">
                        <label htmlFor="AddArt_about" className="AddArtPage_label">Описание</label>
                        <textarea placeholder="Описание" id="AddArt_about" ref={input => this.descriptionInput = input} className="input AddArtPage_about"/>
                    </div>

                    <h5 className="AddArtPage_headerTags">Выберете подходящие тэги, описывающие вашу работу</h5>
                    <div className="AddArtPage_selectTags">
                        <div className="AddArtPage_check">
                            <input type="checkbox" className="AddArtPage_tag" id="Add_1" value="3D"/>
                            <label htmlFor="Add_1" className="AddArtPage_label">3D</label>
                        </div>

                        <div className="AddArtPage_check">
                            <input type="checkbox" className="AddArtPage_tag" id="Add_2" value="Иллюстрация"/>
                            <label htmlFor="Add_2" className="AddArtPage_label">Иллюстрация</label>
                        </div>

                        <div className="AddArtPage_check">
                            <input type="checkbox" className="AddArtPage_tag" id="Add_3" value="Архитектура"/>
                            <label htmlFor="Add_3" className="AddArtPage_label">Архитектура</label>
                        </div>

                        <div className="AddArtPage_check">
                            <input type="checkbox" className="AddArtPage_tag" id="Add_4" value="Анимационный дизайн"/>
                            <label htmlFor="Add_4" className="AddArtPage_label">Анимационный дизайн</label>
                        </div>

                        <div className="AddArtPage_check">
                            <input type="checkbox" className="AddArtPage_tag" id="Add_5" value="Web-дизайн"/>
                            <label htmlFor="Add_5" className="AddArtPage_label">Web-дизайн</label>
                        </div>

                        <div className="AddArtPage_check">
                            <input type="checkbox" className="AddArtPage_tag" id="Add_6" value="Цифровая живопись"/>
                            <label htmlFor="Add_6" className="AddArtPage_label">Цифровая живопись</label>
                        </div>

                        <div className="AddArtPage_check">
                            <input type="checkbox" className="AddArtPage_tag" id="Add_7" value="Фрактальная графика"/>
                            <label htmlFor="Add_7" className="AddArtPage_label">Фрактальная графика</label>
                        </div>

                        <div className="AddArtPage_check">
                            <input type="checkbox" className="AddArtPage_tag" id="Add_8" value="Типографика"/>
                            <label htmlFor="Add_8" className="AddArtPage_label">Типографика</label>
                        </div>

                        <div className="AddArtPage_check">
                            <input type="checkbox" className="AddArtPage_tag" id="Add_9" value="Гейм-арт"/>
                            <label htmlFor="Add_9" className="AddArtPage_label">Гейм-арт</label>
                        </div>

                        <div className="AddArtPage_check">
                            <input type="checkbox" className="AddArtPage_tag" id="Add_10" value="Пиксель-арт"/>
                            <label htmlFor="Add_10" className="AddArtPage_label">Пиксель-арт</label>
                        </div>

                        <div className="AddArtPage_check">
                            <input type="checkbox" className="AddArtPage_tag" id="Add_11" value="Портрет"/>
                            <label htmlFor="Add_11" className="AddArtPage_label">Портрет</label>
                        </div>
                    </div>
                    <div className="Add_btnWrapper">
                        <button className="button Add_btn" onClick={this.clickHandler.bind(this)}>Добавить работу</button>
                    </div>

                </div>

                <div className="AddArtPage_artWrapper">
                    {this.state.isLoadArt?
                        <div className="AddArtPage_imgWrapper">
                            <div className="AddArtPage_Close" onClick={this.closeArt.bind(this)}>&#10006;</div>
                            <img src="" alt="art" className="AddArt_img" id="AddArt_art" />
                        </div>:
                        <Dropzone onFileAdded={this.onFileAdded.bind(this)}/>
                    }
                </div>

            </div>
        </div>
    }
}