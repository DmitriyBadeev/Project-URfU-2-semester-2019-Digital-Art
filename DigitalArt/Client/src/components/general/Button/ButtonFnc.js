import React from "react";

import "./button.sass"

const ButtonFnc = (props) => (
    <div className="button" onClick={props.function} id={props.id} >
        {props.text}
    </div>
);

export default ButtonFnc;