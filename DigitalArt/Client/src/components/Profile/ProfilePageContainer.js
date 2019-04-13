import React from 'react';

import ProfilePage from './ProfilePage';
import { withRouter } from "react-router-dom";
import {connect} from "react-redux";
import { getUserInfo } from "../../store/Header/UserInfo/actions";

class ProfilePageContainer extends React.Component {

    render() {
        return <ProfilePage
            getUserInfo = {this.props.getUserInfo}
            id={this.props.id}
            email={this.props.email}
            name={this.props.name}
            lastName={this.props.lastName}
            artworks={this.props.artworks}
        />
    }
}

const mapStateToProps = state => {
    return {
        id: state.userInfo.id,
        email: state.userInfo.email,
        name: state.userInfo.name,
        lastName: state.userInfo.lastName,
        artworks: state.userInfo.artworks
    }
};

const mapDispatchToProps = dispatch => {
        return {
            getUserInfo: () => dispatch(getUserInfo())
        }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfilePageContainer));
