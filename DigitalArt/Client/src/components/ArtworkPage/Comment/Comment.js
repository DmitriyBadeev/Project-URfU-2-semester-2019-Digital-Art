import React from "react";

import './comment.sass';
import Link from "react-router-dom/es/Link";

export default class Comment extends React.Component {

    getTimeAgo() {
        let timePublish = new Date(this.props.date).toLocaleString("ru", {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        console.log(timePublish);

        let timeDiff = +Date.now() - +new Date(this.props.date);
        timeDiff  /= 1000;

        const seconds = Math.round(timeDiff % 60);
        timeDiff = Math.floor(timeDiff / 60);

        const minutes = Math.round(timeDiff % 60);
        timeDiff = Math.floor(timeDiff / 60);

        const hours = Math.round(timeDiff % 24);
        timeDiff = Math.floor(timeDiff / 24);

        const days = timeDiff;

        if (days !== 0)
            return `${days} дня назад`;

        if (hours !== 0)
            return `${hours} часа назад`;

        if (minutes !== 0)
            return `${minutes} минут назад`;

        if (seconds !== 0)
            return `${seconds} секунды назад`;

        return "только что";
    }

    render() {
        return <div className="Comment__container">
            <div className="Comment__author">
                <Link to={`/profile/${this.props.authorId}`} onClick={this.props.closeArtwork.bind(this)}>
                    <div className="avatar_wrapper">
                        <img src={`data:image/JPEG;base64,${this.props.authorAvatar}`} alt="avatar" className="avatar" />
                    </div>
                </Link>
            </div>
            <div className="Comment__wrapper">
                <div className="Comment__wrapper_header">
                    <p className="Comment__author_name">
                        <Link to={`/profile/${this.props.authorId}`} onClick={this.props.closeArtwork.bind(this)}>
                            {this.props.authorName}
                        </Link>
                    </p>
                    <p className="Comment__timeAgo"> &bull; {this.getTimeAgo()}</p>
                </div>
                <div className="Comment__text">{this.props.comment}</div>

            </div>
        </div>
    }
}

