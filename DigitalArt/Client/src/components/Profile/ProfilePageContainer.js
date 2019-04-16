import React from 'react';

import ProfilePage from './ProfilePage';
import { withRouter } from "react-router-dom";
import {connect} from "react-redux";
import { getUserInfo } from "../../store/Header/UserInfo/actions";
import {deleteArtwork} from "../../store/Profile/actions";

class ProfilePageContainer extends React.Component {

    render() {
        return <ProfilePage
            getUserInfo = {this.props.getUserInfo}
            id={this.props.id}
            email={this.props.email}
            name={this.props.name}
            lastName={this.props.lastName}
            artworks={this.props.artworks}
            avatar={this.props.avatar}
            isLoadingInfo={this.props.isLoadingInfo}
            deleteArtwork={this.props.deleteArtwork}
            isLoadingDelete={this.props.isLoadingDelete}
        />
    }
}

const mapStateToProps = state => {
    return {
        id: state.userInfo.id,
        email: state.userInfo.email,
        name: state.userInfo.name,
        lastName: state.userInfo.lastName,
        avatar: state.userInfo.avatar,
        artworks: state.userInfo.artworks,
        isLoadingInfo: state.userInfo.isLoading,
        isLoadingDelete: state.profile.isLoading
    }
};

const mapDispatchToProps = dispatch => {
        return {
            getUserInfo: () => dispatch(getUserInfo()),
            deleteArtwork: (id) => dispatch(deleteArtwork(id))
        }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfilePageContainer));
