import React from "react"
import "./style.scss"

export default function LangSwitcher(props) {
    return (
        <div class="lang-switcher">
            <input type="checkbox" id="lang-switcher" />
            <label for="lang-switcher">
                <div class="lang-switcher__item">EN</div>
                <div class="lang-switcher__item">DE</div>
            </label>                    
        </div>
    )
}
