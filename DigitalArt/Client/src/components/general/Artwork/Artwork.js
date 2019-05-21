import React from 'react';

import './artwork.sass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default class Artwork extends  React.Component{

    toDeleteArtwork() {
        const idArt = this.props.art.id;

        const isExactly = confirm("Вы дейсвительно хотите удалить работу?");
        if (!isExactly) return;

        this.props.deleteArtwork(idArt);
    }

    openArtwork() {
        this.props.openArtwork(this.props.art.id);
    }

    render() {
        return <figure className="Artwork__container">
                <img src={`data:image/JPEG;base64,${this.props.art.art}`} alt="art" className="Artwork__img"/>
                <div className="Artwork__info" onClick={this.openArtwork.bind(this)}>
                    <h5 className="Artwork__name">{this.props.art.name}</h5>
                    <p className="Artwork__author">{this.props.art.author}</p>
                    <p className="Artwork__assessments">
                        &nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon="thumbs-up" /> {this.props.art.countLikes}
                        &nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon="comment-alt" /> {this.props.art.countComments}
                        &nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon="eye" /> {this.props.art.countViews}
                    </p>
                </div>
            {this.props.id === this.props.authUserId && this.props.isProfile?
                <div className="Artwork__btnClose" onClick={this.toDeleteArtwork.bind(this)}>&#10006;</div> : null}
            </figure>
    }
}

