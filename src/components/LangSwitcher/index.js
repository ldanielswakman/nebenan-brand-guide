import React from "react"
import "./style.scss"

export default function LangSwitcher(props) {
    return (
        <div className="lang-switcher">
            <input type="checkbox" id="lang-switcher" />
            <label htmlFor="lang-switcher">
                <div className="lang-switcher__item">EN</div>
                <div className="lang-switcher__item">DE</div>
            </label>                    
        </div>
    )
}
