import React from 'react';
import Link from "react-router-dom/es/Link";

export default class ProfilePage extends React.Component {

    componentDidMount() {
        this.props.getUserInfo();
    }

    toDeleteArtwork(e) {
        const idArt = this.props.artworks[e.target.value].id;
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

        const formData = new FormData();

        formData.append("Name", this.nameInput.value);
        formData.append("Author", this.props.email);
        formData.append("Tags", this.tagInput.value);
        formData.append("Description", this.descriptionInput.value);
        formData.append("File", file);

        this.props.postArtwork(formData);
    }

    render() {
        return <div>
            <h1>Ваш профиль</h1>
            <h2>Информация о вас</h2>
            <div>
                <hr/>
                {this.props.isLoadingInfo? <p>Loading</p>:<img src={`data:image/JPEG;base64,${this.props.avatar}`} alt="avatar"/>}
                <p>Загрузить аватарку</p>
                <input type="file" onChange={this.handleFile.bind(this)}/> <br/>
                <button onClick={this.handleSave.bind(this)}>Сохранить</button>
                <hr/>
            </div>
            <ul>
                <li>{this.props.isLoadingInfo? <p>Loading</p>: this.props.id}</li>
                <li>{this.props.isLoadingInfo? <p>Loading</p>: this.props.email}</li>
                <li>{this.props.isLoadingInfo? <p>Loading</p>: this.props.name}</li>
                <li>{this.props.isLoadingInfo? <p>Loading</p>: this.props.lastName}</li>
            </ul>
            <h2>Ваши работы</h2>
            {this.props.isLoadingInfo? <p>Loading</p>: this.props.artworks.map((art, index) =>
                <ul key={index}>
                    <li>{art.id}</li>
                    <li>{art.name}</li>
                    <li>{art.author}</li>
                    <li>{art.date}</li>
                    <li>{art.countLikes}</li>
                    <li>{art.countComents}</li>
                    <li>{art.tags}</li>
                    <li><img src={`data:image/JPEG;base64,${art.art}`} alt="art"/></li>
                    <button value={index} onClick={this.toDeleteArtwork.bind(this)}>Удалить</button>
                </ul>
            )}
            <Link to="/add-artwork">Добавить работу</Link>
        </div>
    }
}