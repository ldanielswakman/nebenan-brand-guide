import React from "react"
import { Link } from "gatsby"
import "./style.scss"

export default function NextButton(props) {
    return (
        <Link to={props.node.frontmatter.slug} className="next-button">
            <div className="next-button__pretitle">NEXT:</div>
            <h4>{props.node.frontmatter.title}</h4>
        </Link>
    )
}
