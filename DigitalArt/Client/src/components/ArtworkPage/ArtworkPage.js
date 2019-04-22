import React from "react";

import "./artworkPage.sass";
import Loading from "../general/Loading/Loading";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default class ArtworkPage extends React.Component{

    componentDidMount() {
        this.props.getArtwork(this.props.openArtworkId);

        document.body.style.overflow = "hidden";
    }

    componentDidUpdate() {
        if(!this.props.isLoading)
            history.pushState(null, null, `/artwork/${this.props.artwork.id}`);
    }

    componentWillUnmount() {
        document.body.style.overflow = "scroll";
    }

    closeHandler() {
        this.props.closeArtwork();

        history.back()
    }

    render() {
        return <div className="ArtworkPage__wrapper">
            <div className="ArtworkPage__container">
                {this.props.isLoading? <Loading /> :
                <img src={`data:image/JPEG;base64,${this.props.artwork.art}`} alt="art" className="Artwork__img"/>}
                <div className="ArtworkPage__assessment_container">
                    <h2 className="ArtworkPage__assessment_header">{this.props.artwork.name}</h2>
                    <p className="ArtworkPage__assessment_description">{this.props.artwork.description}</p>

                    <div className="ArtworkPage__assessment_author">
                        <img src={`data:image/JPEG;base64,${this.props.artwork.authorAvatar}`}
                             alt="avatar" className="ArtworkPage__assessment_author_avatar"/>
                         <div className="ArtworkPage__assessment_author_block">
                            <p className="ArtworkPage__assessment_author_name">{this.props.artwork.author}</p>
                            <div className="ArtworkPage__assessment_author_sub">Подписаться</div>
                         </div>
                    </div>
                </div>
                <div className="ArtworkPage__like_container">
                    <div className="Artwork__like_wrapper">
                        <div className="Artwork__like">
                            <FontAwesomeIcon icon="thumbs-up" />
                        </div>
                        <div className="Artwork__like_statistic">
                            <FontAwesomeIcon icon="thumbs-up" /> {this.props.artwork.countLikes} &nbsp;&nbsp;<FontAwesomeIcon icon="comment-alt" /> {this.props.artwork.countComments}
                        </div>
                    </div>
                    <div className="ArtworkPage__assessment_date">Опубликовано: {
                        new Date(this.props.artwork.date).toLocaleString("ru",
                            {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                    </div>
                </div>

            </div>

            <div className="ArtworkPage__close_wrapper" onClick={this.closeHandler.bind(this)}>&#10006;</div>
        </div>
    }
}