import React from 'react';

interface IProps {
    title?: string;
    description?: string;
    url?: string;
    ogi?: string;
};

const DefaultHead: React.FC<IProps> = ({ title, description, url, ogi }) => {
    return (
        <>
            <meta name="viewport"
                  content="width=device-width, initial-scale=1.0"
            />

            <title>{title}</title>
            <meta name="description"
                  content={description}
            />

            <meta property="og:url"
                  content={url}
            />
            <meta property="og:type"
                  content="website"
            />
            <meta property="og:title"
                  content={title}
            />
            <meta property="og:description"
                  content={description}
            />
            <meta property="og:image"
                  content={ogi}
            />

            <meta name="twitter:card"
                  content="summary_large_image"
            />
            <meta property="twitter:url"
                  content={url}
            />
            <meta name="twitter:title"
                  content={title}
            />
            <meta name="twitter:description"
                  content={description}
            />
            <meta name="twitter:image"
                  content={ogi}
            />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
            <link href="https://fonts.googleapis.com/css2?family=Jost:wght@400;600;700&display=swap"
                  rel="stylesheet"
            />
        </>
    );
};

DefaultHead.defaultProps = {
    title: process.env.NEXT_PUBLIC_TITLE,
    description: process.env.NEXT_PUBLIC_DESCRIPTION,
    url: process.env.NEXT_PUBLIC_URL,
    ogi: process.env.NEXT_PUBLIC_OG_IMAGE,
};

export default DefaultHead;
