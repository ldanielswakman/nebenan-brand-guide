import React, { useState } from "react"
import { Link } from "gatsby"
import { injectIntl, FormattedMessage } from "gatsby-plugin-intl"

import "./style.scss"

const Menu = (props) => {

    const [active, setActive] = useState('');

    const splitChapters = {
        'understanding': props.chapters.filter(chapter => chapter.section === "understanding"),
        'using': props.chapters.filter(chapter => chapter.section === "using"),
    }

    return (
        <section className={`toc ${props.home ? 'toc--home' : ''}`}>

            <div className={`toc__section ${active === 'understanding' ? 'isActive' : ''}`}>
                <div onClick={() => active === 'understanding' ? setActive('') : setActive('understanding')} className="toc__header">
                    <div className="toc__icon">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 0C11.9778 0 13.9112 0.58649 15.5557 1.6853C17.2002 2.78412 18.4819 4.3459 19.2388 6.17317C19.9957 8.00043 20.1937 10.0111 19.8079 11.9509C19.422 13.8907 18.4696 15.6725 17.0711 17.0711C15.6725 18.4696 13.8907 19.422 11.9509 19.8079C10.0111 20.1937 8.00043 19.9957 6.17317 19.2388C4.3459 18.4819 2.78412 17.2002 1.6853 15.5557C0.58649 13.9112 0 11.9778 0 10C0 7.34784 1.05357 4.8043 2.92893 2.92893C4.8043 1.05357 7.34784 0 10 0V0ZM10.7146 1.45793L10.7143 2.85714H9.28571L9.28607 1.45786C7.26651 1.62698 5.37214 2.50605 3.93909 3.93909C2.50605 5.37214 1.62698 7.26651 1.45786 9.28607L2.85714 9.28571V10.7143L1.45793 10.7146C1.62718 12.7341 2.5063 14.6283 3.93932 16.0612C5.37235 17.4941 7.26662 18.3731 9.28607 18.5421L9.28571 17.1429H10.7143L10.7146 18.5421C12.734 18.3728 14.628 17.4938 16.0609 16.0609C17.4938 14.628 18.3728 12.734 18.5421 10.7146L17.1429 10.7143V9.28571L18.5421 9.28607C18.3731 7.26662 17.4941 5.37235 16.0612 3.93932C14.6283 2.5063 12.7341 1.62718 10.7146 1.45793V1.45793ZM15.5091 4.90886C15.5698 5.07055 15.5698 5.24874 15.5091 5.41043L12.6394 12.2214C12.6036 12.3169 12.5477 12.4036 12.4756 12.4757C12.4035 12.5478 12.3168 12.6036 12.2214 12.6394L5.41043 15.5091C5.28202 15.5573 5.14247 15.5674 5.00844 15.5384C4.87441 15.5094 4.75158 15.4424 4.65461 15.3454C4.55764 15.2484 4.49063 15.1256 4.4616 14.9916C4.43256 14.8575 4.44272 14.718 4.49086 14.5896L7.36064 7.77857C7.39645 7.6831 7.45227 7.5964 7.52437 7.5243C7.59647 7.4522 7.68317 7.39637 7.77864 7.36057L14.5896 4.49079C14.767 4.42428 14.9635 4.43097 15.1359 4.50937C15.3084 4.58778 15.4426 4.73148 15.5091 4.90886V4.90886ZM13.6198 6.38029L8.58407 8.58429L11.4156 11.4159L13.6198 6.38029Z" fill="#B2CA06" />
                        </svg>
                    </div>
                    <div className="toc__title">
                        <div className="toc__pretitle"><FormattedMessage id="section_1_pretitle" /></div>
                        <h3><FormattedMessage id="section_1_title" /></h3>
                    </div>
                </div>
                <ul className="toc__content">
                    {splitChapters.understanding.map(chapter => (
                        <li key={'understanding' + chapter.id}><Link activeClassName="is-active" to={'/' + chapter.node_locale + '/' + chapter.section + '/' + chapter.slug}>{chapter.title}</Link></li>
                    ))}
                </ul>
                <div onClick={() => setActive('')} className="toc__mask" />
            </div>
            <div className={`toc__section ${active === 'using' ? 'isActive' : ''}`}>
                <div onClick={() => active === 'using' ? setActive('') : setActive('using')} className="toc__header">
                    <div className="toc__icon">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M20 18.5714V20H0.714292V18.5714H20ZM20 15.7143V17.1428H7.85715V15.7143H20ZM13.9181 0.194336L16.9485 3.22476L4.32143 15.8517L0.281006 16.8618L1.29115 12.8214L13.9181 0.194336ZM11.3929 4.73998L2.58108 13.5516L2.24436 14.8985L3.59129 14.5618L12.4029 5.74998L11.3929 4.73998ZM20 12.8571V14.2857H12.1429V12.8571H20ZM13.9181 2.21462L12.4029 3.72984L13.413 4.73998L14.9286 3.22476L13.9181 2.21462Z" fill="#B2CA06" />
                        </svg>
                    </div>
                    <div className="toc__title">
                        <div className="toc__pretitle"><FormattedMessage id="section_2_pretitle" /></div>
                        <h3><FormattedMessage id="section_2_title" /></h3>
                    </div>
                </div>
                <ul className="toc__content">
                    {splitChapters.using.map(chapter => (
                        <li key={'using' + chapter.id}><Link activeClassName="is-active" to={'/' + chapter.node_locale + '/' + chapter.section + '/' + chapter.slug}>{chapter.title}</Link></li>
                    ))}
                </ul>
                <div onClick={() => setActive('')} className="toc__mask" />
            </div>
        </section>
    )
}

export default injectIntl(Menu)
