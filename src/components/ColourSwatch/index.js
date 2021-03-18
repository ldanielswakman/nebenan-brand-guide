import React, { useState } from "react"
import "./style.scss"
import {CopyToClipboard} from 'react-copy-to-clipboard'

export default function ColourSwatch(props) {

    const [clipboardCopied, setClipboardCopied] = useState(false);

    return (
        <div className="colour-swatch">
            
            <CopyToClipboard text={props.colour}
                onCopy={() => {
                setClipboardCopied(true);
                setTimeout(function() {
                    setClipboardCopied(false)
                }, 1000)
                }}>
                <button style={{ background: props.colour, border: 'none', borderRadius: '8px', padding: '0.5rem 1rem', font: 'inherit', color: 'white', fontSize: '1.125rem', fontWeight: '600'}}>Copy to clipboard with span</button>
            </CopyToClipboard>
            {clipboardCopied ? <span style={{color: 'red'}}>Copied.</span> : null}
            <p style={{ fontSize: '2rem', fontWeight: 600 }}>{props.colour}</p>

        </div>
    )
}
