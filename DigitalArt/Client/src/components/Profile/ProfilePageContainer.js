import React from 'react';

import ProfilePage from './ProfilePage';
import { withRouter } from "react-router-dom";
import {connect} from "react-redux";
import { getUserInfo } from "../../store/Header/UserInfo/actions";
import {deleteArtwork, deleteSubscribe, getSubscribers, postSubscribe} from "../../store/Profile/actions";

class ProfilePageContainer extends React.Component {

    render() {
        return <ProfilePage
            getUserInfo={this.props.getUserInfo}
            id={this.props.id}
            email={this.props.email}
            name={this.props.name}
            lastName={this.props.lastName}
            artworks={this.props.artworks}
            avatar={this.props.avatar}
            isLoadingInfo={this.props.isLoadingInfo}
            deleteArtwork={this.props.deleteArtwork}
            isLoadingDelete={this.props.isLoadingDelete}
            routeId={this.props.match.params.userId}
            authUserId={this.props.authUserId}
            dateOfBirthday={this.props.dateOfBirthday}
            status={this.props.status}
            about={this.props.about}
            country={this.props.country}
            city={this.props.city}
            countSubs={this.props.countSubs}
            isLoadingSubs={this.props.isLoadingSubs}
            getSubscribers={this.props.getSubscribers}
            postSubscribe={this.props.postSubscribe}
            isSubscribe={this.props.isSubscribe}
            deleteSubscribe={this.props.deleteSubscribe}
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
        authUserId: state.userInfo.authUser.id,
        isLoadingInfo: state.userInfo.isLoading,
        isLoadingDelete: state.profile.isLoading,
        dateOfBirthday: state.userInfo.dateOfBirthday,
        status: state.userInfo.status,
        about: state.userInfo.about,
        country: state.userInfo.country,
        city: state.userInfo.city,
        countSubs: state.profile.countSubs,
        isLoadingSubs: state.profile.isLoadingSubs,
        isSubscribe: state.profile.isSubscribe
    }
};

const mapDispatchToProps = dispatch => {
        return {
            getUserInfo: (id, sortParams) => dispatch(getUserInfo(id, sortParams)),
            deleteArtwork: (id) => dispatch(deleteArtwork(id)),
            getSubscribers: (idAuthor, idAuthUser) => dispatch(getSubscribers(idAuthor, idAuthUser)),
            postSubscribe: (idAuthor, idUser) => dispatch(postSubscribe(idAuthor, idUser)),
            deleteSubscribe: (idAuthor, idUser) => dispatch(deleteSubscribe(idAuthor, idUser))
        }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfilePageContainer));
