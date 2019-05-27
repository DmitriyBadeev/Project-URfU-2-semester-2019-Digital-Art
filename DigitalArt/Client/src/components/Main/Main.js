import React from 'react';
import Masonry from 'react-masonry-component'
import Artwork from "../general/Artwork/ArtworkContainer";

import "./main.sass"
import Loading from "../general/Loading/Loading";
import Filter from "../general/Filter/Filter";
import Search from "../general/Search/Search";

export default class Main extends React.Component {

    componentDidMount() {
        this.props.getArtworks("Самые популярные");
    }

    searchHandler(e) {
        e.preventDefault();
        this.props.searchArts(e.target.searchInput.value);
    }

    render() {

        const sortButtons = [
            "Самые популярные",
            "Самые новые",
            "Самые обсуждаемые",
            "Самые просматриваемые"
        ];

        return <div className="Main__wrapper">
            <div className="Main__searchWrapper">
                <Search onSearch={this.searchHandler.bind(this)}/>
                <Filter buttons={sortButtons} getArtworks={this.props.getArtworks}/>
            </div>
            {this.props.isLoadingArts? <Loading />: <Masonry className="Main__arts">
                    {this.props.artworks.map((art, index) =>
                    <Artwork
                        key={index}
                        art={art}
                        index={index}
                        isProfile={false}
                    />
                )}
                {this.props.artworks.length === 0? <div className="Main_massage">Поиск не дал результатов</div>: null}
            </Masonry>}

        </div>
    }
}
