import React from 'react';
import User from './User/User';

import './profile.sass';
import Artwork from "../general/Artwork/ArtworkContainer";
import Masonry from 'react-masonry-component';
import ButtonLink from "../general/Button/ButtonLink"
import Loading from "../general/Loading/Loading";
import Filter from "../general/Filter/Filter";
import Link from "react-router-dom/es/Link";

export default class ProfilePage extends React.Component {

    componentDidMount() {
        this.props.getUserInfo(this.props.routeId, "Самые новые");

        setTimeout(() => {
            this.props.getSubscribers(this.props.routeId, this.props.authUserId);
        }, 1000)
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.routeId !== nextProps.routeId) {
            this.props.getUserInfo(nextProps.routeId);
            this.props.getSubscribers(this.props.routeId, this.props.authUserId);
        }
    }

    handleFile(e) {
        const photo = e.target.files[0];
        const avatar = document.getElementById("avatar");
        const reader = new FileReader();
        reader.onloadend = () => avatar.src = reader.result;
        photo? reader.readAsDataURL(photo): avatar.src = "";
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
        const sortButtons = [
            "Самые новые",
            "Самые популярные",
            "Самые обсуждаемые",
            "Самые просматриваемые"
        ];

        return <div className="Profile__container">
            <div className="Profile__userInfo">
                <User
                    isLoadingInfo={this.props.isLoadingInfo}
                    avatar={this.props.avatar}
                    email={this.props.email}
                    name={this.props.name}
                    lastName={this.props.lastName}
                    id={this.props.id}
                    authUserId={this.props.authUserId}
                    dateOfBirthday={this.props.dateOfBirthday}
                    status={this.props.status}
                    about={this.props.about}
                    country={this.props.country}
                    city={this.props.city}
                    countSubs={this.props.countSubs}
                    isLoadingSubs={this.props.isLoadingSubs}
                    postSubscribe={this.props.postSubscribe}
                    isSubscribe={this.props.isSubscribe}
                    deleteSubscribe={this.props.deleteSubscribe}
                />

                <div className="Profile__artsInfo">
                    <h2 className="Profile__header">Статистика</h2>
                    <p className="Profile__info">Всего работ: <strong>{this.props.artworks.length}</strong></p>
                    <p className="Profile__info">Количество лайков: <strong>{this.countLike()}</strong></p>
                    <p className="Profile__info">Количество комментариев: <strong>{this.countComment()}</strong></p>
                    <p className="Profile__info">Количество просмотров: <strong>{this.countView()}</strong></p>
                </div>
                {this.props.id === this.props.authUserId?
                    <ButtonLink className="Profile__addArt button" link="/add-artwork" text="Добавить работу"/>: null}
            </div>
            
            <div className="Profile__usersArtworks">
                <Filter buttons={sortButtons} getUserInfo={this.props.getUserInfo} id={this.props.id}/>
                <Masonry>
                    {this.props.isLoadingInfo? <Loading />: this.props.artworks.map((art, index) =>
                            <Artwork key={index}
                                     art={art}
                                     index={index}
                                     deleteArtwork={this.props.deleteArtwork}
                                     isProfile={true}
                                     id={this.props.id}
                                     authUserId={this.props.authUserId}
                                />
                    )}
                </Masonry>
                {this.props.artworks.length === 0 && !this.props.isLoadingInfo?
                    <Link to="/add-artwork"><div className="Profile__massage">Добавьте свою первую работу!</div></Link> : null}
            </div>
        </div>


    }
}