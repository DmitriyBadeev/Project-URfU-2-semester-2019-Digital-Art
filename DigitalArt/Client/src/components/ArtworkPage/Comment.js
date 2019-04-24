import React from "react";

export default class Comment extends React.Component {

    render() {
        return <div>
            <img src={`data:image/JPEG;base64,${this.props.authorAvatar}`} alt="avatar" />
            <p>{this.props.authorName}</p>
            <p>{this.props.authorId}</p>
            <p>{this.props.comment}</p>
        </div>
    }
}

