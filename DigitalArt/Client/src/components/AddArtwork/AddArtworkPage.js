import React from 'react';

import {Redirect} from "react-router-dom";

export default class AddArtworkPage extends React.Component {

    clickHandler() {
        const now = new Date();

        const newArtwork = {
            Name: this.nameInput.value,
            Author: this.props.email,
            Date: now,
            Tags: [this.tagInput.value],
            Description: this.descriptionInput.value
        };

        this.props.postArtwork(newArtwork);
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
            <button onClick={this.clickHandler.bind(this)}>Добавить работу</button>
        </div>
    }
}