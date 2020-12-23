import React from "react"
import { Link } from "gatsby"
import Menu from "../Menu"

import "./style.scss"

export default function Sidebar() {
    return (
        <aside className="panel panel--nav">

            <nav>

                <section className="nav-header">
                    <Link to="/">
                        <img src="/images/nebenan-monogram.svg" alt="" />
                        <h2>Brand Guide</h2>
                    </Link>
                </section>

                <Menu />

            </nav>
        </aside>
    )
}
