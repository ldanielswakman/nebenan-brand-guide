import React from "react"
import "./style.scss"
import { injectIntl, Link, FormattedMessage } from "gatsby-plugin-intl"

export default function NextButton(props) {

    const target = {
        link: "/",
        title: "Home"
    }
    if (props.node !== undefined) {
        target.link = '/' + props.node.section + '/' + props.node.slug;
        target.title = props.node.title;
        console.log(props.node);
    }

    return (
        <Link to={target.link} className="next-button">
            <div className="next-button__pretitle"><FormattedMessage id="next" />:</div>
            <h4>{target.title}</h4>
        </Link>
    )
}
