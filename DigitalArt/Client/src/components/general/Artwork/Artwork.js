import React from 'react';

import './artwork.sass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Artwork extends  React.Component{

    render() {
        return <figure className="Artwork__container">
                    <img src={`data:image/JPEG;base64,${this.props.art.art}`} alt="art" className="Artwork__img"/>
                    <div className="Artwork__info">
                        <h5 className="Artwork__name">{this.props.art.name}</h5>
                        <p className="Artwork__author">{this.props.art.author}</p>
                        <p className="Artwork__likes"><FontAwesomeIcon icon="thumbs-up" /> {this.props.art.countLikes}</p>
                        <p className="Artwork__comments"><FontAwesomeIcon icon="comment-alt" /> {this.props.art.countComents}</p>
                    </div>
            </figure>
    }
}

