import React from 'react';

import Main from './Main'
import {getArtworks, getArtworksElse} from "../../store/Main/actions";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

class MainContainer extends React.Component {

    render() {
        return <Main
            artworks={this.props.artworks}
            getArtworks={this.props.getArtworks}
            isLoadingArts={this.props.isLoadingArts}
            isLoadingElse={this.props.isLoadingElse}
        />
    }
}

const mapStateToProps = state => {
    return {
        artworks: state.main.artworks,
        isLoadingArts: state.main.isLoadingMain,
        isLoadingElse: state.main.isLoadingElse
    }
};

const mapDispatchToProps  = dispatch => {
    return {
        getArtworks: (sortParams) => dispatch(getArtworks(sortParams)),
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainContainer));