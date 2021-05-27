import React from "react"
import { Link } from "gatsby"
import "./style.scss"

export default function NextButton(props) {

    const target = {
        link: "/",
        title: "Home"
    }
    if(props.node !== undefined) {
        target.link = props.node.slug;
        target.title = props.node.title;
    }

    return (
        <Link to={target.link} className="next-button">
            <div className="next-button__pretitle">NEXT:</div>
            <h4>{target.title}</h4>
        </Link>
    )
}
