import React from 'react';
import { connect } from 'react-redux';
import {
    setEmailInState,
    setNameInState,
    setPasswordInState
} from '../../store/Registration/actions';
import RegistrationForm from './RegistrationForm';

class RegistrationFormContainer extends React.Component {

    render() {
        return <RegistrationForm
            email={this.props.email}
            password={this.props.password}
            name={this.props.name}
            setNameInState={this.props.setNameInState}
            setPasswordInState={this.props.setPasswordInState}
            setEmailInState={this.props.setEmailInState}
        />
    }
}

const mapStateToProps = state => {
    return {
        email: state.registration.email,
        password: state.registration.password,
        name: state.registration.name
    }
};

const mapDispatchToProps = {
    setNameInState,
    setPasswordInState,
    setEmailInState
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationFormContainer);