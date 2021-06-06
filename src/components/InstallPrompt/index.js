import React, { useState } from "react"
import "./style.scss"

export default function InstallPrompt(props) {

    const [active, setActive] = useState(false);

    React.useEffect(() => {
        window.addEventListener('beforeinstallprompt', (e) => {
            // Prevent the mini-infobar from appearing on mobile
            e.preventDefault();
            // Stash the event so it can be triggered later.
            const deferredPrompt = e;
            // Update UI notify the user they can install the PWA
            console.log('installable action!');
            setActive(true)
        });
    }, []);

    return (
        <div className={`install-prompt ${active && 'isActive'}`}>
            <h4>Take this guide with you!</h4>
            <p>Install on your device for easy access</p>

            <div className="actions">
                <button className="button button--reveal">Not now</button>
                <button className="button button--primary">Install</button>
            </div>
        </div>
    )
}
