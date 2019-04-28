import React from "react";

import ArtworkPage from "./ArtworkPage";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {deleteLike, getLike, getUserArtwork, postLike, postComment, postView} from "../../store/ArtworkPage/actions";
import {closeArtworkPage, getArtworks} from "../../store/Main/actions";

class ArtworkPageContainer extends React.Component {

    render() {
        return <ArtworkPage
            artwork={this.props.artwork}
            getArtwork={this.props.getArtwork}
            openArtworkId = {this.props.openArtworkId}
            routeId = {this.props.match.params.artId}
            closeArtwork = {this.props.closeArtwork}
            isLoading = {this.props.isLoading}
            getLike = {this.props.getLike}
            userId = {this.props.userId}
            postLike = {this.props.postLike}
            deleteLike = {this.props.deleteLike}
            massage = {this.props.massage}
            postComment = {this.props.postComment}
            isAuth = {this.props.isAuth}
            userAvatar = {this.props.userAvatar}
            postView = {this.props.postView}
        />
    }
}

const mapStateToProps = state => {
    return {
        artwork: state.artworkPage.artwork,
        isLoading: state.artworkPage.isLoadingArt,
        openArtworkId: state.main.openArtworkId,
        userId: state.userInfo.authUser.id,
        userAvatar: state.userInfo.authUser.avatar,
        massage: state.artworkPage.massage,
        isAuth: state.authorization.isAuth
    }
};

const mapDispatchToProps = dispatch => {
    return {
        postLike: likeData => dispatch(postLike(likeData)),
        getArtwork: id => dispatch(getUserArtwork(id)),
        closeArtwork: () => dispatch(closeArtworkPage()),
        getLike: (userId, idArt) => dispatch(getLike(userId, idArt)),
        deleteLike: (userId, idArt) => dispatch(deleteLike(userId, idArt)),
        postComment: (comment) => dispatch(postComment(comment)),
        postView: (idArt) => dispatch(postView(idArt))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArtworkPageContainer));