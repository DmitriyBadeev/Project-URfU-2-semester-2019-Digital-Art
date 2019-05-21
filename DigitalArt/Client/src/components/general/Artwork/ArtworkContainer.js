import  React from 'react';

import Artwork from './Artwork';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

import { openArtworkPage } from '../../../store/Main/actions'

class ArtworkContainer extends React.Component{

    render() {
        return <Artwork
            openArtwork={this.props.openArtwork}
            openArtworkId={this.props.openArtworkId}
            art={this.props.art}
            index={this.props.index}
            deleteArtwork={this.props.deleteArtwork}
            isAuthUser={this.props.isAuthUser}
            id={this.props.id}
            authUserId={this.props.authUserId}
            isProfile={this.props.isProfile}
            authUser={this.props.authUser}
        />
    }
}

const mapStateToProps = state => {
    return {
        openArtworkId: state.main.openArtworkId,
        authUser: state.userInfo.authUser
    }
};

const mapDispatchToProps = dispatch => {
    return {
        openArtwork: id => dispatch(openArtworkPage(id))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArtworkContainer));