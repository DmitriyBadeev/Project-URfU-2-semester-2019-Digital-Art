import React from "react";

import "./button.sass"
import "./smallButton.sass"

const ButtonFnc = (props) => (
    <div className={props.className} onClick={props.function} id={props.id} >
        {props.text}
    </div>
);

export default ButtonFnc;