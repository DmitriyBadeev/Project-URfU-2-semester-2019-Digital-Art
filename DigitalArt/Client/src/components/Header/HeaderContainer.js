import React from 'react';

import Header from './Header';
import {openDialogRegistration,
        closeDialogRegistration,
        openDialogAuth,
        closeDialogAuth} from "../../store/Header/actions";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {getUserInfo} from "../../store/Header/UserInfo/actions";

class HeaderContainer extends React.Component {

    render() {
        return <Header
            isOpenRegistration={this.props.isOpenRegistration}
            isOpenAuth={this.props.isOpenAuth}
            openRegistration={this.props.openDialogRegistration}
            closeRegistration={this.props.closeDialogRegistration}
            openAuth={this.props.openDialogAuth}
            closeAuth={this.props.closeDialogAuth}
            isAuth={this.props.isAuth}
            getUserInfo={this.props.getUserInfo}
        />
    }
}

const mapStateToProps = (state) => {
  return {
      isOpenRegistration: state.header.isOpenRegistrationDialog,
      isOpenAuth: state.header.isOpenAuthDialog,
      isAuth: state.authorization.isAuth
  }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUserInfo: () => dispatch(getUserInfo()),
        openDialogRegistration: () => dispatch(openDialogRegistration()),
        closeDialogRegistration: () => dispatch(closeDialogRegistration()),
        openDialogAuth: () => dispatch(openDialogAuth()),
        closeDialogAuth: () => dispatch(closeDialogAuth())
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderContainer));