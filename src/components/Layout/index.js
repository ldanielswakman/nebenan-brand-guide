import React, { useState, useEffect } from "react"

import "fontsource-open-sans"
import "fontsource-open-sans/600.css"
import "fontsource-open-sans/700.css"
import "./style.scss"

export default function Layout({children, page}) {

    const [isLoaded, setIsLoaded] = useState(false);
  
    useEffect(() => {
      setTimeout(function () {
        setIsLoaded(true);
      }, 0);
    }, []);

    return (
        <div className={`layout${isLoaded ? ' is-loaded' : ''}`}>
            {children}
        </div>
    )
}
