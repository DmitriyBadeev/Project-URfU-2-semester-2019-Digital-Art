import React from "react";

import ArtworkPage from "./ArtworkPage";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {closeArtworkPage, getUserArtwork} from "../../store/Main/actions";

class ArtworkPageContainer extends React.Component {

    render() {
        return <ArtworkPage
            artwork={this.props.artwork}
            getArtwork={this.props.getArtwork}
            openArtworkId = {this.props.openArtworkId}
            closeArtwork = {this.props.closeArtwork}
            isLoading = {this.props.isLoading}
        />
    }
}

const mapStateToProps = state => {
    return {
        artwork: state.main.artwork,
        isLoading: state.main.isLoadingArt,
        openArtworkId: state.main.openArtworkId
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getArtwork: id => dispatch(getUserArtwork(id)),
        closeArtwork: () => dispatch(closeArtworkPage())
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArtworkPageContainer));