import React, { useState } from "react"
import "./style.scss"
import {CopyToClipboard} from 'react-copy-to-clipboard'

export default function ColourSwatch(props) {

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
                    <p>{props.colour}</p>
                    <p className="subtle">Click to copy</p>
                </div>
                <div className={copiedActive ? 'message is-active' : 'message'}>
                    <span>Copied to clipboard!</span>
                </div>
            </div>
            
        </CopyToClipboard>
    )
}
