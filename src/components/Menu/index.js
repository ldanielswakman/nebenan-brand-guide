import React, { useState } from "react"
import { injectIntl, Link, FormattedMessage } from "gatsby-plugin-intl"

import "./style.scss"

const Menu = (props) => {

    const [active, setActive] = useState('');

    const splitChapters = {
        'understanding': props.chapters.filter(chapter => chapter.section === "understanding"),
        'using': props.chapters.filter(chapter => chapter.section === "using"),
    }

    const handleToggle = section => {
        if (active === section) {
            setActive('')
        } else {
            setActive(section)
        }
    }

    const svgEyeCrossed = (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.91667 2.91667L17.0833 17.0833M10 4.16667C5.45204 4.16667 2.37276 8.27898 1.50205 9.59802C1.33949 9.84427 1.33949 10.1557 1.50205 10.402C2.37276 11.721 5.45204 15.8333 10 15.8333C14.548 15.8333 17.6272 11.721 18.4979 10.402C18.6605 10.1557 18.6605 9.84427 18.4979 9.59802C17.6272 8.27898 14.548 4.16667 10 4.16667ZM10 6.66667C8.15905 6.66667 6.66667 8.15906 6.66667 10C6.66667 11.841 8.15905 13.3333 10 13.3333C11.8409 13.3333 13.3333 11.841 13.3333 10C13.3333 8.15906 11.8409 6.66667 10 6.66667Z" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/>
        </svg>
    );


    return (
        <section className={`toc ${props.home ? 'toc--home' : ''}`}>

            <div className={`toc__section ${active === 'understanding' ? 'isActive' : ''}`}>
                <div role="button" tabIndex="-1" aria-label="Open Understanding Menu" onClick={() => handleToggle('understanding')} onKeyDown={() => handleToggle('understanding')} className="toc__header">
                    <div className="toc__icon">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.5 10.75C17.5 14.8921 14.1421 18.25 10 18.25M17.5 10.75C17.5 6.60786 14.1421 3.25 10 3.25M17.5 10.75H15.9375M10 18.25C5.85786 18.25 2.5 14.8921 2.5 10.75M10 18.25V16.6875M2.5 10.75C2.5 6.60786 5.85786 3.25 10 3.25M2.5 10.75H4.0625M10 3.25V4.8125M11.25 12L8.75 9.5M11.6601 12.0928L13.7325 7.42997C13.8487 7.16847 13.5815 6.90126 13.32 7.01749L8.65717 9.08987C8.51577 9.15271 8.40271 9.26577 8.33987 9.40717L6.26749 14.07C6.15126 14.3315 6.41847 14.5987 6.67997 14.4825L11.3428 12.4101C11.4842 12.3473 11.5973 12.2342 11.6601 12.0928Z" stroke="currentColor" stroke-width="1" stroke-linecap="round"/>
                        </svg>
                    </div>
                    <div className="toc__title">
                        <div className="toc__pretitle"><FormattedMessage id="section_1_pretitle" /></div>
                        <h3><FormattedMessage id="section_1_title" /></h3>
                    </div>
                </div>
                <ul className="toc__content">
                    {splitChapters.understanding.map(chapter => (
                        <li key={'understanding' + chapter.id}>
                            <Link activeClassName="is-active" to={'/' + chapter.section + '/' + chapter.slug}>
                                {chapter.title}
                                {(chapter.underConstruction === true) && svgEyeCrossed}
                            </Link>
                        </li>
                    ))}
                </ul>
                <div role="button" tabIndex="-1" aria-label="Close menu" onClick={() => setActive('')} onKeyDown={() => setActive('')} className="toc__mask" />
            </div>
            <div className={`toc__section ${active === 'using' ? 'isActive' : ''}`}>
            <div role="button" tabIndex="-1" aria-label="Open Using menu" onClick={() => handleToggle('using')} onKeyDown={() => handleToggle('using')} className="toc__header">
                    <div className="toc__icon">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M27.5 27H4M14 23H27.5M27.5 19H20M21.1317 10.4038L23.253 8.2825C23.6436 7.89197 23.6436 7.25881 23.253 6.86828L21.1317 4.74696C20.7412 4.35644 20.108 4.35644 19.7175 4.74696L17.5962 6.86828M21.1317 10.4038L8.6066 22.9289C8.47408 23.0615 8.30697 23.1541 8.12435 23.1962C7.02178 23.4507 5.01673 23.8172 4.28067 23.9498C4.14393 23.9744 4.02561 23.8561 4.05023 23.7194C4.1827 22.9837 4.5489 20.9802 4.80378 19.8757C4.84593 19.693 4.93854 19.5259 5.07107 19.3934L17.5962 6.86828M21.1317 10.4038L17.5962 6.86828" stroke="#201649" stroke-width="1.5" stroke-linecap="round"/>
                    </svg>
                    </div>
                    <div className="toc__title">
                        <div className="toc__pretitle"><FormattedMessage id="section_2_pretitle" /></div>
                        <h3><FormattedMessage id="section_2_title" /></h3>
                    </div>
                </div>
                <ul className="toc__content">
                    {splitChapters.using.map(chapter => (
                        <li key={'using' + chapter.id}>
                            <Link activeClassName="is-active" to={'/' + chapter.section + '/' + chapter.slug}>
                                {chapter.title}
                                {(chapter.underConstruction === true) && svgEyeCrossed}
                            </Link>
                        </li>
                    ))}
                </ul>
                <div role="button" tabIndex="-1" aria-label="Close menu" onClick={() => setActive('')} onKeyDown={() => setActive('')} className="toc__mask" />
            </div>
        </section>
    )
}

export default injectIntl(Menu)
