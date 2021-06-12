import React from "react"
import { Link } from "gatsby"
import { injectIntl, FormattedMessage, useIntl } from "gatsby-plugin-intl"

import Menu from "../Menu"
import InstallPrompt from "../InstallPrompt"

import "./style.scss"

const Sidebar = (props) => {

    const intl = useIntl()

    return (
        <aside className="panel panel--nav">

            <div className="sidebar">

                <section className="sidebar__header">
                    <Link to={`/` + intl.locale}>
                        <img src="/images/nebenan-monogram.svg" alt="" />
                        <h2><FormattedMessage id="short_name" /></h2>
                    </Link>
                </section>

                <Menu chapters={props.chapters} />

                <InstallPrompt />

            </div>
        </aside>
    )
}

export default injectIntl(Sidebar)
