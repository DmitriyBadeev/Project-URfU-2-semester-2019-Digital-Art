import React from 'react';
import Link from "react-router-dom/es/Link";

export default class ProfilePage extends React.Component {

    componentDidMount() {
        this.props.getUserInfo();
    }

    render() {
        return <div>
            <h1>Ваш профиль</h1>
            <h2>Информация о вас</h2>
            <ul>
                <li>{this.props.id}</li>
                <li>{this.props.email}</li>
                <li>{this.props.name}</li>
                <li>{this.props.lastName}</li>
            </ul>
            <h2>Ваши работы</h2>
            <ul>
                {this.props.artworks.map((art, index) =>
                    <ul key={index}>
                        <li>{art.name}</li>
                        <li>{art.author}</li>
                        <li>{art.date}</li>
                        <li>{art.countLikes}</li>
                        <li>{art.countComents}</li>
                        <li>{art.tags}</li>
                    </ul>
                )}
            </ul>

            <Link to="/add-artwork">Добавить работу</Link>
        </div>
    }
}