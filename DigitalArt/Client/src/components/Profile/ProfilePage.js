import React from 'react';
import User from './User/User';

import './profile.sass';
import Artwork from "../general/Artwork/ArtworkContainer";
import Masonry from 'react-masonry-component';
import ButtonLink from "../general/Button/ButtonLink"
import Button from "../general/Button/ButtonFnc";
import Loading from "../general/Loading/Loading";


export default class ProfilePage extends React.Component {

    componentDidMount() {
        this.props.getUserInfo(this.props.routeId);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.routeId !== nextProps.routeId)
            this.props.getUserInfo(nextProps.routeId);
    }

    handleFile(e) {
        const photo = e.target.files[0];
        const avatar = document.getElementById("avatar");
        const reader = new FileReader();
        reader.onloadend = () => avatar.src = reader.result;
        photo? reader.readAsDataURL(photo): avatar.src = "";
    }

    handleSave() {
        const file = this.fileInput.files[0];
        console.log(file);
    }

    countLike() {
        let count = 0;
        this.props.artworks.forEach( (art) => {
            count += art.countLikes;
        });

        return count;
    }

    countComment() {
        let count = 0;
        this.props.artworks.forEach((art) => {
            count += art.countComments;
        });

        return count;
    }

    countView() {
        let count = 0;
        this.props.artworks.forEach((art) => {
            count += art.countViews;
        });

        return count;
    }

    render() {
        return <div className="Profile__container">
            <div className="Profile__userInfo">
                <User
                    isLoadingInfo={this.props.isLoadingInfo}
                    avatar={this.props.avatar}
                    email={this.props.email}
                    name={this.props.name}
                    lastName={this.props.lastName}
                />

                <div className="Profile__artsInfo">
                    <h2 className="Profile__header">Статистика</h2>
                    <p className="Profile__info">Всего работ: <strong>{this.props.artworks.length}</strong></p>
                    <p className="Profile__info">Количество лайков: <strong>{this.countLike()}</strong></p>
                    <p className="Profile__info">Количество комментариев: <strong>{this.countComment()}</strong></p>
                    <p className="Profile__info">Количество просмотров: <strong>{this.countView()}</strong></p>
                </div>
                <ButtonLink className="Profile__addArt button" link="/add-artwork" text="Добавить работу"/>
            </div>
            
            <div className="Profile__usersArtworks">
                <div className="Profile__filter">
                    <Button className="Profile__btn smallButton smallButton__active" text="Самые новые"/>
                    <Button className="Profile__btn smallButton" text="Самые популярные"/>
                    <Button className="Profile__btn smallButton" text="Самые обсуждаемые"/>
                </div>
                <Masonry>
                    {this.props.isLoadingInfo? <Loading />: this.props.artworks.map((art, index) =>
                            <Artwork key={index}
                                    art={art}
                                    index={index}
                                    deleteArtwork={this.props.deleteArtwork}
                                    isAuthUser={true}
                                />
                    )}
                </Masonry>
            </div>
        </div>


    }
}