import React from 'react';

import './artwork.sass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default class Artwork extends  React.Component{

    toDeleteArtwork() {
        const idArt = this.props.art.id;

        const isExactly = confirm("Вы дейсвительно хотите удалить работу?");
        if (!isExactly) return;

        this.props.deleteArtwork(idArt);
        this.props.history.push('/profile');
    }

    openArtwork() {
        this.props.openArtwork(this.props.art.id);
    }

    render() {
        return <figure className="Artwork__container" onClick={this.openArtwork.bind(this)}>
                <img src={`data:image/JPEG;base64,${this.props.art.art}`} alt="art" className="Artwork__img"/>
                <div className="Artwork__info">
                    <h5 className="Artwork__name">{this.props.art.name}</h5>
                    <p className="Artwork__author">{this.props.art.author}</p>
                    <p className="Artwork__assessments">
                        &nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon="thumbs-up" /> {this.props.art.countLikes}
                        &nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon="comment-alt" /> {this.props.art.countComments}
                        &nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon="eye" /> {this.props.art.countViews}
                    </p>
                    {this.props.isAuthUser? <div className="Artwork__btnClose" onClick={this.toDeleteArtwork.bind(this)}>&#10006;</div> : null}
                </div>
            </figure>
    }
}

