import React from 'react';

import ButtonFnc from '../../general/Button/ButtonFnc'
import './user.sass';

export default class User extends React.Component{

    handleFile(e) {
        const photo = e.target.files[0];

        const avatar = document.getElementById("avatar");

        const reader = new FileReader();

        reader.onloadend = () => avatar.src = reader.result;

        photo? reader.readAsDataURL(photo): avatar.src = `data:image/JPEG;base64,${this.props.avatar}`;
    }

    handleChange() {
         const changeBlock = document.getElementById("User__selectImg");

         if (changeBlock.style.display === "none")
            changeBlock.style.display = "block";
         else
             changeBlock.style.display = "none"
    }

    handleSave() {

    }

    render() {
        return <div className="UserWrapper">
            <div className="avatarWrapper">
                {this.props.isLoadingInfo? <p>Loading</p>:<img src={`data:image/JPEG;base64,${this.props.avatar}`}
                                                               alt="avatar"
                                                               className="avatar"
                                                               id="avatar"
                />}
            </div>

            <div>
                <h2>{this.props.isLoadingInfo? <p>Loading</p>: `${this.props.name} ${this.props.lastName}`}</h2>
                <p>Email: {this.props.isLoadingInfo? <p>Loading</p>: this.props.email}</p>
            </div>

            <ButtonFnc text="Сменить аватарку" function={this.handleChange.bind(this)} id="userButton"/>

            <div id="User__selectImg">
                <input className="input" type="file" onChange={this.handleFile.bind(this)}/> <br/>
                <button onClick={this.handleSave.bind(this)} className="button">Сохранить</button>
            </div>
        </div>
    }
}

