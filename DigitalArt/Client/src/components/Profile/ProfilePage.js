import React from 'react';
import User from './User/User';

import './profile.sass';
import Artwork from "../general/Artwork/Artwork";
import Masonry from 'react-masonry-component';
import ButtonLink from "../general/Button/ButtonLink"


export default class ProfilePage extends React.Component {

    componentDidMount() {
        this.props.getUserInfo();
    }

    toDeleteArtwork(e) {
        console.log(e.target.id);
        const idArt = this.props.artworks[e.target.id].id;
        console.log(idArt);
        this.props.deleteArtwork(idArt);
        this.props.history.push('/profile');
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
                <ButtonLink link="/add-artwork" text="Добавить работу"/>
            </div>

            <Masonry className="Profile__usersArtworks">

                {this.props.isLoadingInfo? <p>Loading</p>: this.props.artworks.map((art, index) =>
                        <Artwork key={index}
                                art={art}
                                index={index}
                                toDeleteArtwork={this.toDeleteArtwork.bind(this)}
                            />
                )}
            </Masonry>

        </div>


    }
}