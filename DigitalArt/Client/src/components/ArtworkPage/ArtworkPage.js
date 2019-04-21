import React from "react";

import "./artworkPage.sass";
import Loading from "../general/Loading/Loading";

export default class ArtworkPage extends React.Component{

    componentDidMount() {
        this.props.getArtwork(this.props.openArtworkId);

        document.body.style.overflow = "hidden";
    }

    componentWillUnmount() {
        document.body.style.overflow = "scroll";
    }

    closeHandler() {
        this.props.closeArtwork();
    }

    render() {
        return <div className="ArtworkPage__wrapper">
            <div className="ArtworkPage__container">

                    {this.props.isLoading? <Loading /> :
                        <img src={`data:image/JPEG;base64,${this.props.artwork.art}`} alt="art" className="Artwork__img"/>}

            </div>

            <div className="ArtworkPage__close_wrapper" onClick={this.closeHandler.bind(this)}>&#10006;</div>
        </div>
    }
}