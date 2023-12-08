import React, { useState } from "react"
import "./style.scss"
import {CopyToClipboard} from 'react-copy-to-clipboard'
import { injectIntl, FormattedMessage } from "gatsby-plugin-intl"

const ColourSwatch = (props) => {

    const [copiedActive, setCopiedActive] = useState(false);

    return (
        <CopyToClipboard text={props.colour}
            onCopy={() => {
            setCopiedActive(true);
            setTimeout(function() {
                setCopiedActive(false)
            }, 1000)
            }}>

            <div className="colour-swatch">
                <div className="swatch" style={{ background: props.colour }}/>
                <div className="text">
                    <h4>{props.name || 'Swatch'}</h4>
                    <p>{props.description}</p>
                    <p>
                        {props.colour}
                        &nbsp;<span className="subtle">(<FormattedMessage id="click_to_copy" />)</span>
                    </p>
                </div>
                <div className={copiedActive ? 'message is-active' : 'message'}>
                    <span><FormattedMessage id="copied" /></span>
                </div>
            </div>
            
        </CopyToClipboard>
    )
}

export default injectIntl(ColourSwatch)
