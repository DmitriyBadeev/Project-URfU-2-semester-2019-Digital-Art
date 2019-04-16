import React from 'react';

import AuthForm from './AuthForm';

import { authorizationUser } from "../../store/Auth/actions";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {closeDialogAuth} from "../../store/Header/actions";

class AuthFormContainer extends React.Component {

    render() {
        return <AuthForm
            authorization = {this.props.authorization}
            massage = {this.props.massage}
            closeAuth={this.props.closeDialogAuth}
        />
    }
}

const mapStateToProps = (state) => {
    return {
        massage: state.authorization.massage
    }
};

const mapDispatchToProps = dispatch => {
    return {
        authorization: (user, isRemember) => dispatch(authorizationUser(user, isRemember)),
        closeDialogAuth: () => dispatch(closeDialogAuth())
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthFormContainer));

