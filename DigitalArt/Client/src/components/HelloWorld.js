import React from 'react';
import axios from 'axios';

export default class HelloWorld extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            persons: [],
            textPOST: "",
            textGETID: ""
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleInputPOST = this.handleInputPOST.bind(this);
        this.handleInputGETID = this.handleInputGETID.bind(this);
    }

    componentDidMount() {
        axios.get('https://localhost:44380/api/home')
            .then(res => {
                const data = res.data;
                console.log(data);
                console.log(res);
                this.setState({persons: data} );
            });
    }

    handleInputPOST(e1) {
        this.setState({textPOST: e1.target.value});
    }

    handleInputGETID(e2) {
        this.setState({textGETID: e2.target.value})
    }

    handleClick() {
        // const newUser = {
        //     "email": `${this.state.textPOST}@mail.ru`,
        //     "password": `${this.state.textPOST}`,
        //     "name": `${this.state.textPOST}`
        // };
        //
        // axios.post('https://localhost:44380/api/home', newUser)
        //     .then(res => {
        //         console.log(res.data);
        //         console.log(res);
        //         this.setState({textPOST: ""});
        //     })
        //     .then(() => {
        //         axios.get('https://localhost:44380/api/home')
        //             .then(res => {
        //                 const data = res.data;
        //                 console.log(data);
        //                 console.log(res);
        //                 this.setState({persons: data});
        //             });
        //     });

        axios.get(`https://localhost:44380/api/home/${this.state.textGETID}`)
            .then(res => {
                const data = res.data;
                console.log(data);
                console.log(res);
                this.setState({persons: [data]});
            });
    }

    render() {
        return <div>
            {this.state.persons.map((person) =>
                <li key={person.id}>
                    <li>email: {person.email}</li>
                    <li>name: {person.name}</li>
                    <li>password: {person.password}</li>
                </li>)}
            <hr />
            <input type="text" onChange={this.handleInputPOST} value={this.state.textPOST} /> <br />
            <input type="text" onChange={this.handleInputGETID} value={this.state.textGETID} /> <br />
            <button onClick={this.handleClick}>Добавить</button>
        </div>
    }
}