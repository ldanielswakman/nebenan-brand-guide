import React, { useState } from "react"
import "./style.scss"

export default function InstallPrompt(props) {

    const [active, setActive] = useState(true);
    var [deferredPrompt, setDeferredPrompt] = useState(null);

    React.useEffect(() => {
        window.addEventListener('beforeinstallprompt', (e) => {
            // Prevent the mini-infobar from appearing on mobile
            e.preventDefault();
            // Stash the event so it can be triggered later.
            setDeferredPrompt(e);
            // Update UI notify the user they can install the PWA
            setTimeout(function () {
                setActive(true);
            }, 2000);
        });
        window.addEventListener('appinstalled', () => {
            // Hide the app-provided install promotion
            setActive(false);
            // Clear the deferredPrompt so it can be garbage collected
            deferredPrompt = null;
            // Optionally, send analytics event to indicate successful install
            console.log('PWA was installed');
        });
    }, []);

    function handleInstall(e) {
        // Hide the app provided install promotion
        setActive(false);
        // Show the install prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        // const { outcome } = await deferredPrompt.userChoice;
        // Optionally, send analytics event with outcome of user choice
        // console.log(`User response to the install prompt: ${outcome}`);
        // We've used the prompt, and can't use it again, throw it away
        deferredPrompt = null;
    }

    return (
        <div className={`install-prompt ${active && 'isActive'}`}>

            <div className="content">
                <h4>Take this guide with you!</h4>
                <p>Install on your device for easy access</p>
            </div>

            <div className="actions">
                <button onClick={() => setActive(false)} className="button button--reveal">Not now</button>
                <button onClick={handleInstall} className="button button--primary">Install</button>
            </div>

        </div>
    )
}
