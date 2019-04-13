import React from 'react';

import AuthForm from './AuthForm';

import { authorizationUser } from "../../store/Auth/actions";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class AuthFormContainer extends React.Component {

    render() {
        return <AuthForm
            authorization = {this.props.authorization}
            massage = {this.props.massage}
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
        authorization: (user) => dispatch(authorizationUser(user)),
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthFormContainer));

