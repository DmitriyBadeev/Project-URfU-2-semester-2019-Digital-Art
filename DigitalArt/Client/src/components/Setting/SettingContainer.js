import React from 'react';

import Setting from './Setting';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {putAuthUser} from "../../store/Header/UserInfo/actions";

class SettingContainer extends React.Component {

    render() {
        return <Setting
            authUser={this.props.authUser}
            isLoadingInfo={this.props.isLoadingInfo}
            putAuthUser={this.props.putAuthUser}
            massage={this.props.massage}
        />
    }
}

const mapStateToProps = state => {
    return {
        authUser: state.userInfo.authUser,
        isLoadingInfo: state.userInfo.isLoading,
        massage: state.userInfo.massage
    }
};

const mapDispatchToProps = dispath => {
    return {
        putAuthUser: user => dispath(putAuthUser(user))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SettingContainer))