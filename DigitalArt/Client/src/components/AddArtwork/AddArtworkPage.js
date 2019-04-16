import React from 'react';

import {Redirect} from "react-router-dom";

export default class AddArtworkPage extends React.Component {

    clickHandler() {
        const file = this.fileInput.files[0];
        console.log(file);

        const formData = new FormData();

        formData.append("Name", this.nameInput.value);
        formData.append("Author", this.props.email);
        formData.append("Tags", this.tagInput.value);
        formData.append("Description", this.descriptionInput.value);
        formData.append("File", file);

        this.props.postArtwork(formData);
    }

    handleFile(e) {
        const art = e.target.files[0];

        const preview = document.getElementById("preview");

        const reader = new FileReader();

        reader.onloadend = () => preview.src = reader.result;

        art? reader.readAsDataURL(art): preview.src = "";
    }

    render() {
        const {isRedirect} = this.props;

        if (isRedirect) {
            this.props.isRedirected();
            return <Redirect to="/profile" />
        }

        return <div>
            <input type="text" placeholder="Название" ref={input => this.nameInput = input}/> <br />
            <textarea placeholder="описание" ref={input => this.descriptionInput = input} /> <br />
            <input type="text" placeholder="Tag" ref={input => this.tagInput = input}/> <br />

            <input type="file" onChange={this.handleFile.bind(this)} ref={input => this.fileInput = input}/> <br />
            <hr/>
            <div>
                <img src="" alt="art" id="preview" height="200px" />  <br />
            </div>
            <hr/>
            <button onClick={this.clickHandler.bind(this)}>Добавить работу</button>
        </div>
    }
}