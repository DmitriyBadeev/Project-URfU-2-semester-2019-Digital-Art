import React from 'react';

export default class Main extends React.Component {

    componentDidMount() {
        this.props.getArtworks();
    }

    render() {
        return <div>
                <h1>Главная страница</h1>
                {this.props.isLoading? <p>Loading</p>: this.props.artworks.map((art, index) =>
                    <ul key={index}>
                        <li><img src={`data:image/JPEG;base64,${art.art}`} alt="art"/></li>
                        <li>{art.name}</li>
                        <li>{art.author}</li>
                        <li>{art.date}</li>
                        <li>{art.countLikes}</li>
                        <li>{art.countComents}</li>
                    </ul>
                )}
            </div>
    }
}