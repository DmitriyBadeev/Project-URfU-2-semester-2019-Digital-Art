import React from 'react';
import Button from "../Button/ButtonFnc";

import './filter.sass'

export default class Filter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            active: 0
        }
    }

    handleClick(e) {
        const newActiveBtnId = e.target.id;
        const sortSetting = e.target.innerText;
        this.setState({active: +newActiveBtnId});

        if (!this.props.getUserInfo) {
            let id = this.props.authUser.id;
            if (sortSetting === "Моя лента")
                this.props.getArtworks(sortSetting, id);
            else
                this.props.getArtworks(sortSetting, 0);
        }
        else
            this.props.getUserInfo(this.props.id, sortSetting);
    }

    render() {
        return <div className="Filter_container">
            {this.props.buttons.map((btn, index) =>
                <Button className={`Filter__btn smallButton ${index === this.state.active? "smallButton__active": ""}`}
                        text={btn}
                        function={this.handleClick.bind(this)}
                        id={index}
                        key={index}
                />
            )}
            {!this.props.getUserInfo? this.props.authUser.id?
                <Button className={`Filter__btn smallButton_blue ${10 === this.state.active? "smallButton_blue__active": ""}`}
                                text="Моя лента"
                                function={this.handleClick.bind(this)}
                                id="10"
            />: null: null}
        </div>
    }
}