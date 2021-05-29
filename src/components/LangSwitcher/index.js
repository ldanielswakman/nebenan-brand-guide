import React, { useState } from "react"
import { injectIntl, IntlContextConsumer, changeLocale } from "gatsby-plugin-intl"

import "./style.scss"

const LangSwitcher = ({ intl }) => {

    const [selected, setSelected] = useState(intl.locale);

    return (
        <div className="lang-switcher" data-active={selected}>
            <IntlContextConsumer>
                {({ languages, language: currentLocale }) =>
                    languages.map(language => (
                        <>
                            {(language === currentLocale) ? (
                                <div key={language} className="lang-switcher__item current">
                                    {language.toUpperCase()}
                                </div>
                            ) : (
                                <div onClick={() => { setSelected(language); changeLocale(language) }} key={language} className="lang-switcher__item">
                                    {language.toUpperCase()}
                                </div>
                            )}
                        </>
                    ))
                }
            </IntlContextConsumer>
        </div>
    )
}

export default injectIntl(LangSwitcher)
