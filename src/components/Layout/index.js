import React, { useState, useEffect } from "react"

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
