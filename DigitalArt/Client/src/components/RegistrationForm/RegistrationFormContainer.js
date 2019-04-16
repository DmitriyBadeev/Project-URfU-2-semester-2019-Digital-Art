import React from 'react';
import { connect } from 'react-redux';
import {
    registrationUser
} from '../../store/Registration/actions';
import RegistrationForm from './RegistrationForm';
import { withRouter } from "react-router-dom";
import {closeDialogRegistration} from "../../store/Header/actions";

class RegistrationFormContainer extends React.Component {

    render() {
        return <RegistrationForm
            registration={this.props.registration}
            massage={this.props.massage}
            closeRegistration={this.props.closeDialogRegistration}
        />
    }
}

const mapStateToProps = state => {
    return {
        massage: state.registration.massage
    }
};

const mapDispatchToProps = dispatch => {
    return {
        registration: (user) => dispatch(registrationUser(user)),
        closeDialogRegistration: () => dispatch(closeDialogRegistration())
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RegistrationFormContainer));