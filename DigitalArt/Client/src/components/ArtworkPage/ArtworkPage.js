import React from "react";

import "./artworkPage.sass";
import Loading from "../general/Loading/Loading";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Comment from "./Comment/Comment";
import Link from "react-router-dom/es/Link";

export default class ArtworkPage extends React.Component{

    componentDidMount() {
        this.props.getArtwork(this.props.openArtworkId || this.props.routeId);
        this.props.postView(this.props.openArtworkId || this.props.routeId);
        document.body.style.overflow = "hidden";

        if (this.props.userId === "")
            return;

        this.props.getLike(this.props.userId, this.props.openArtworkId);

        if(!this.props.isLoading)
            history.pushState(null, null, `/artwork/${this.props.openArtworkId || this.props.routeId}`);
    }

    componentWillUnmount() {
        document.body.style.overflow = "auto";
    }

    closeHandler() {
        this.props.closeArtwork();

        history.back()
    }

    likeHandler() {

        if (!this.props.userId) {
            document.getElementById("massageArt").innerText = "Зарегистрируйтесь, чтобы оценить работу";
            return;
        }


        const like = {
            UserId: this.props.userId,
            ArtworkId: this.props.openArtworkId
        };
        this.props.postLike(like);
    }

    deleteLikeHandler() {
        this.props.deleteLike(this.props.userId, this.props.openArtworkId);
    }

    commentHandler() {

        const comment = {
            IdAuthor: this.props.userId,
            idArt: this.props.openArtworkId,
            Comment: this.commentInput.value
        };

        this.props.postComment(comment);

        this.commentInput.value = "";
    }

    render() {
        return <div className="ArtworkPage__wrapper">

            {this.props.isLoading? <Loading /> :
            <div className="ArtworkPage__container">
                {this.props.openArtworkId === 0? <div className="margin" />: null}
                <img src={`data:image/JPEG;base64,${this.props.artwork.art}`} alt="art" className="Artwork__img"/>
                <div className="ArtworkPage__assessment_container">
                    <h2 className="ArtworkPage__assessment_header">{this.props.artwork.name}</h2>
                    <p className="ArtworkPage__assessment_description">{this.props.artwork.description}</p>

                    <div className="ArtworkPage__assessment_author">
                        <Link to={`/profile/${this.props.artwork.authorId}`}
                              onClick={this.props.closeArtwork.bind(this)}>
                            <img src={`data:image/JPEG;base64,${this.props.artwork.authorAvatar}`}
                                 alt="avatar" className="ArtworkPage__assessment_author_avatar"/>
                        </Link>
                         <div className="ArtworkPage__assessment_author_block">
                             <p className="ArtworkPage__assessment_author_name">
                                 <Link to={`/profile/${this.props.artwork.authorId}`}
                                       onClick={this.props.closeArtwork.bind(this)}>
                                     {this.props.artwork.author}
                                 </Link>
                             </p>
                            <div className="ArtworkPage__assessment_author_sub">Подписаться</div>
                         </div>
                    </div>
                </div>
                <div className="ArtworkPage__like_container">
                    <div className="Artwork__like_wrapper">
                        {this.props.artwork.isLikedArt?
                            <div className="Artwork__like_active" onClick={this.deleteLikeHandler.bind(this)}>
                                <FontAwesomeIcon icon="thumbs-up" />
                            </div>
                            :
                            <div className="Artwork__like" id="like" onClick={this.likeHandler.bind(this)}>
                                <FontAwesomeIcon icon="thumbs-up" />
                            </div> }
                        <div className="Artwork__like_statistic">
                                <FontAwesomeIcon icon="thumbs-up" /> {this.props.artwork.countLikes}
                                &nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon="comment-alt" /> {this.props.artwork.countComments}
                                &nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon="eye" /> {this.props.artwork.countViews}
                        </div>
                        <div id="massageArt" className="Artwork__like_massage">{this.props.massage}</div>
                    </div>
                    <div className="ArtworkPage__assessment_date">Опубликовано: {
                        new Date(this.props.artwork.date).toLocaleString("ru",
                            {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                    </div>
                </div>

                <div className="ArtworkPage__comment_container">
                    {this.props.isAuth ? <div className="ArtworkPage__comment_input_wrapper">
                        <img src={`data:image/JPEG;base64,${this.props.userAvatar}`}
                              alt="avatar" className="ArtworkPage__comment_avatar"/>
                        <div>
                            <textarea ref={input => this.commentInput = input} className="ArtworkPage__comment_input" placeholder="Что вы думаете об этой работе?"/>
                            <div className="button ArtworkPage__comment_btn" onClick={this.commentHandler.bind(this)}>Опубликовать комментарий</div>
                        </div>
                    </div>: <div className="ArtworkPage__comment_input_wrapper">
                        <p className="ArtworkPage__comment_text">Зарегистрируйтесь, чтобы иметь возможность комментировать</p>
                    </div> }

                    <div className="ArtworkPage__comments_wrapper">
                        {this.props.artwork.countComments === 0 || !this.props.artwork.comments?
                            <p className="ArtworkPage__comments_message">Будьте первым, кто оставит комментарий!</p>:
                            this.props.artwork.comments.map((c, i) => <Comment
                                key={i}
                                authorName = {c.commentAuthor}
                                authorAvatar = {c.commentAuthorAvatar}
                                authorId = {c.commentAuthorId}
                                comment = {c.comment}
                                date = {c.date}
                                closeArtwork={this.props.closeArtwork}
                            />)
                        }
                    </div>
                </div>
            </div>}


            {this.props.openArtworkId === 0? null: <div className="ArtworkPage__close_wrapper" onClick={this.closeHandler.bind(this)}>&#10006;</div>}
        </div>
    }
}