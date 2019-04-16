import React from 'react';

import UserInfo from './UserInfo';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getUserInfo } from "../../../store/Header/UserInfo/actions";

class UserInfoContainer extends React.Component{

    render() {
        return <UserInfo
            id={this.props.id}
            email={this.props.email}
            name={this.props.name}
            lastName={this.props.lastName}
            getUserInfo={this.props.getUserInfo}
            isLoading={this.props.isLoading}
        />
    }
}

const mapStateToProps = state => {
    return {
        id: state.userInfo.id,
        email: state.userInfo.email,
        name: state.userInfo.name,
        lastName: state.userInfo.lastName,
        isLoading: state.userInfo.isLoading
    }
};

const mapDispatchToProps = dispatch => {
  return {
      getUserInfo: () => dispatch(getUserInfo())
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserInfoContainer));