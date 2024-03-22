import React, { useEffect, useState } from 'react';

const Redirector = () => {
    const urlDatabase = {
        "dog": `lovedogs.boonovel.com`,
        "tests": `lovedogs.boonovel.com`,
        "cat": `lovecats.boonovel.com`,
    };
    let url = "";
    let urlImage = "";
    const [htmlContent, setHtmlContent] = useState('');
    useEffect(() => {
        const { hostname, pathname } = window.location;
        const sub = hostname.split('.')[0];
        const path = pathname.split('/')[1];
        const path2 = pathname.split('/')[2];
        if (path === 'post' && path2 !== "") {
            for (const key in urlDatabase) {
                if (sub.includes(key)) {
                url = `https://${urlDatabase[key]}/${path2}`;
                urlImage = `https://miu2k3.com/catt.jpg`;
                window.location.replace(`${url}`);
            } else {
                console.log("Invalid URL");
            }
        }
        }
    }, [url]);
    return (
        <Helmet>
            <meta property="og:image" content={`${urlImage}`} />
        </Helmet>
    );
};

export default Redirector;
