import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getArtworks } from '../../store/Main/actions'
import { MAIN_PATH, GET_ARTS_URL } from "../../Config";


class Main extends React.Component {

    componentDidMount() {
        this.props.getData(GET_ARTS_URL);
    }

    render() {
        return <div>
                <Link to="/registration">Регистрация</Link> <br />
                <Link to="/helloworld">Hello World</Link>
                <hr />
                <h1>Главная страница</h1>
                {this.props.artworks.map((art, index) =>
                    <li key={index}>
                        <li>{art.name}</li>
                        <li>{art.author}</li>
                        <li>{art.dateOfPublication}</li>
                    </li>
                )}
            </div>
    }
}

const mapStateToProps = state => {
    return {
        artworks: state.main.artworks
    }
};

const mapDispatchToProps  = dispatch => {
    return {
        getData: url => dispatch(getArtworks(url))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));