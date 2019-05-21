import React from 'react';

import AddArtworkPage from './AddArtworkPage';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {isRedirected, postArtwork} from "../../store/AddArtwork/actions";

class AddArtworkPageContainer extends React.Component {

    render() {
        return <AddArtworkPage
            massage={this.props.massage}
            postArtwork={this.props.postArtwork}
            isRedirect={this.props.isRedirect}
            isRedirected={this.props.isRedirected}
            email={this.props.email}
            idAuthUser={this.props.idAuthUser}
        />
    }
}

const mapStateToProps = state => {
    return {
        massage: state.addArtwork.massage,
        isRedirect: state.addArtwork.isRedirect,
        email: state.userInfo.authUser.email,
        idAuthUser: state.userInfo.authUser.id
    }
};

const mapDispatchToProps = dispatch => {
    return {
        postArtwork: artwork => dispatch(postArtwork(artwork)),
        isRedirected: () => dispatch(isRedirected())
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddArtworkPageContainer));