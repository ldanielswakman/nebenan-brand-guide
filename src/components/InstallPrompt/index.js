import React, { useState } from "react"
import { injectIntl, FormattedMessage } from "gatsby-plugin-intl"
import "./style.scss"

const InstallPrompt = (props) => {

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
                <h4><FormattedMessage id="install_prompt_title" /></h4>
                <p><FormattedMessage id="install_prompt_text" /></p>
            </div>

            <div className="actions">
                <button onClick={() => setActive(false)} className="button button--reveal">
                    <span className="text"><FormattedMessage id="not_now" /></span>
                    <span className="icon">&times;</span>
                </button>
                <button aria-label="Install" onClick={handleInstall} className="button button--primary"><FormattedMessage id="install" /></button>
            </div>

        </div>
    )
}

export default injectIntl(InstallPrompt)
