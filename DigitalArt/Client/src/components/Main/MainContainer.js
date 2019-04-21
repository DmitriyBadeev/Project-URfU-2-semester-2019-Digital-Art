import React from 'react';

import Main from './Main'
import {getArtworks} from "../../store/Main/actions";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

class MainContainer extends React.Component {

    render() {
        return <Main
            artworks={this.props.artworks}
            getArtworks={this.props.getArtworks}
            isLoading={this.props.isLoading}
        />
    }
}

const mapStateToProps = state => {
    return {
        artworks: state.main.artworks,
        isLoading: state.main.isLoadingMain
    }
};

const mapDispatchToProps  = dispatch => {
    return {
        getArtworks: () => dispatch(getArtworks())
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainContainer));