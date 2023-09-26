import React from "react";

export const Meta = ({ title, link, description, image }) => {

    return (
        <>
            <meta charSet="utf-8" />
            <title>{title}</title>
            <link rel="canonical" href={link} />
            <link id="favicon" rel="shortcut icon" href="/images/app-icon.png" />
            <meta name="description" content={description} />
            <meta name="keywords" content="" />
            <meta name="author" content="L Daniel Swakman, https://sincere.studio" />

            <meta property="og:image" content={image} />
            <meta property="og:title" content={title} />
            <meta property="og:site_name" content={title} />
            <meta property="og:description" content={description} />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@ldanielswakman" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
        </>
    )
}
