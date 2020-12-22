import React from "react"
import { Link } from "gatsby"
import Menu from "../components/menu"

import "./sidebar.scss"

export default function Sidebar() {
    return (
        <aside class="panel panel--nav">

            <nav>

                <section class="nav-header">
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
