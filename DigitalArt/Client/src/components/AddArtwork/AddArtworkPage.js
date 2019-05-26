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
            art: null,
            tags: [
                "3D",
                "Иллюстрация",
                "Архитектура",
                "Анимационный дизайн",
                "Web-дизайн",
                "Цифровая живопись",
                "Фрактальная графика",
                "Типографика",
                "Гейм-арт",
                "Пиксель-арт",
                "Портрет",
                "Рисование",
                "Фан-арт"
            ]
        }
    }

    closeArt() {
        this.setState({isLoadArt: !this.state.isLoadArt, art: null});
    }

    getSelectedTags() {
        let selectedTags = [];

        for (let i = 0; i <= this.state.tags.length - 1; i++) {
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
                        {this.state.tags.map((tag, index) => (
                            <div className="AddArtPage_check" key={index}>
                                <input type="checkbox" className="AddArtPage_tag" id={`Add_${index}`} value={`${tag}`}/>
                                <label htmlFor={`Add_${index}`} className="AddArtPage_label">{tag}</label>
                            </div>
                        ))}
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