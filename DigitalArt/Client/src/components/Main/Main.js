import React from 'react';
import Masonry from 'react-masonry-component'
import Artwork from "../general/Artwork/ArtworkContainer";

import Button from "../general/Button/ButtonFnc"
import "./main.sass"
import Loading from "../general/Loading/Loading";

export default class Main extends React.Component {

    componentDidMount() {
        this.props.getArtworks();
    }

    render() {
        return <div className="Main__wrapper">
            <input type="search" className="Main__search" placeholder="Поиск"/>
            <div className="Main__filter">
                <Button className="Main__btn smallButton smallButton__active" text="Самые популярные"/>
                <Button className="Main__btn smallButton" text="Самые новые"/>
                <Button className="Main__btn smallButton" text="Самые обсуждаемые"/>
            </div>

            {this.props.isLoading? <Loading />: <Masonry className="Main__arts">
                    {this.props.artworks.map((art, index) =>
                    <Artwork
                        key={index}
                        art={art}
                        index={index}
                        isAuthUser={false}
                    />
                )}
            </Masonry>}
        </div>
    }
}
