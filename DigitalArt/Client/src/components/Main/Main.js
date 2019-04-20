import React from 'react';
import Masonry from 'react-masonry-component'
import Artwork from "../general/Artwork/Artwork";

import "./main.sass"

export default class Main extends React.Component {

    componentDidMount() {
        this.props.getArtworks();
    }

    render() {
        return <div className="Main__wrapper">
            <input type="search" className="Main__search" placeholder="Поиск"/>

            <Masonry className="Main__arts">
                {this.props.isLoading? <p>Loading</p>: this.props.artworks.map((art, index) =>
                    <Artwork
                        key={index}
                        art={art}
                        index={index}
                    />
                )}
            </Masonry>
        </div>
    }
}
