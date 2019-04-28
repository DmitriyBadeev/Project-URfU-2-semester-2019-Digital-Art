import React from 'react';

import UserInfo from './UserInfo';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getAuthUser } from "../../../store/Header/UserInfo/actions";

class UserInfoContainer extends React.Component{

    render() {
        return <UserInfo
            authUser={this.props.authUser}
            isLoading={this.props.isLoading}
            getAuthUser={this.props.getAuthUser}
        />
    }
}

const mapStateToProps = state => {
    return {
        authUser: state.userInfo.authUser,
        isLoading: state.userInfo.isLoading
    }
};

const mapDispatchToProps = dispatch => {
  return {
      getAuthUser: () => dispatch(getAuthUser())
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserInfoContainer));