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
        console.log(sortSetting);

        if (!this.props.getUserInfo)
            this.props.getArtworks(sortSetting);
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
        </div>
    }
}