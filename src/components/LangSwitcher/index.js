import React from "react"
import { IntlContextConsumer, changeLocale } from "gatsby-plugin-intl"

import "./style.scss"

export default function LangSwitcher() {
    return (
        <div className="lang-switcher">

            <input type="checkbox" id="lang-switcher" />
            <label htmlFor="lang-switcher">
                <IntlContextConsumer>
                    {({ languages, language: currentLocale }) =>
                        languages.map(language => (
                            <div onClick={() => changeLocale(language)} key={language} className={`lang-switcher__item ${language === currentLocale ? 'current' : ''}`}>
                                {language.toUpperCase()}
                            </div>
                        ))
                    }
                </IntlContextConsumer>
            </label>

        </div>
    )
}
