import React from "react";

import "./button.sass"
import Link from "react-router-dom/es/Link";

const ButtonFnc = (props) => (
    <div className={props.className} id={props.id} >
        <Link to={props.link}>{props.text}</Link>
    </div>
);

export default ButtonFnc;