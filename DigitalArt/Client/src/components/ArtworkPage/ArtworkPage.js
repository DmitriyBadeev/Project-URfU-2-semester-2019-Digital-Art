import React from "react";

import "./artworkPage.sass";
import Loading from "../general/Loading/Loading";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Comment from "./Comment/Comment";
import Link from "react-router-dom/es/Link";

export default class ArtworkPage extends React.Component{

    componentDidMount() {
        this.props.getArtwork(this.props.openArtworkId || this.props.routeId, this.props.userId);

        setTimeout(() => {
            this.props.getSubscribers(this.props.artwork.authorId, this.props.userId);
        }, 1000);


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

    getTags() {
        if (this.props.artwork.tags == null)
            return "";

        let tags = this.props.artwork.tags;
        let resultTags = '';
        for (let i = 0; i < tags.length; i++)
            if (tags[i] !== ',')
                resultTags += tags[i];
            else
                resultTags += ' #';

        return '#' + resultTags;
    }

    handleSub () {
        const authorId = this.props.artwork.authorId;
        const userId = this.props.userId;

        this.props.postSubscribe(authorId, userId);
    }

    handleUnsub() {
        const authorId = this.props.artwork.authorId;
        const userId = this.props.userId;

        this.props.deleteSubscribe(authorId, userId);
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
                    <p className="ArtworkPage__assessment_tags">{this.getTags()}</p>
                    <div className="ArtworkPage__assessment_author">
                        <div className="avatar_wrapper">
                            <Link to={`/profile/${this.props.artwork.authorId}`}
                                  onClick={this.props.closeArtwork.bind(this)}>
                                <img src={`data:image/JPEG;base64,${this.props.artwork.authorAvatar}`}
                                     alt="avatar" className="avatar"/>
                            </Link>
                        </div>
                         <div className="ArtworkPage__assessment_author_block">
                             <p className="ArtworkPage__assessment_author_name">
                                 <Link to={`/profile/${this.props.artwork.authorId}`}
                                       onClick={this.props.closeArtwork.bind(this)}>
                                     {this.props.artwork.author}
                                 </Link>
                             </p>
                             {this.props.artwork.authorId === this.props.userId ?
                                 <div className="ArtworkPage__assessment_author_sub_active">Это вы</div>
                                 :
                                 this.props.isSubscribe ?
                                 <div className="ArtworkPage__assessment_author_sub_active" onClick={this.handleUnsub.bind(this)}>Отписаться</div>
                                 :
                                 <div className="ArtworkPage__assessment_author_sub" onClick={this.handleSub.bind(this)}>Подписаться</div>
                             }
                         </div>
                    </div>
                    <div className="Sub_massage">{this.props.massageSub}</div>
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
                        <div className="ArtworkPage__comment_avatar_wrapper avatar_wrapper">
                            <img src={`data:image/JPEG;base64,${this.props.userAvatar}`}
                                 alt="avatar" className="avatar"/>
                        </div>
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