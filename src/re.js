import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

const Redirector = () => {
    const urlDatabase = {
        "dog": `lovedogs.boonovel.com`,
        "imtests": `lovedogs.boonovel.com`,
        "cat": `lovecats.boonovel.com`,
    };
    let url = "";
    const [imageUrl, setimageUrl] = useState('');
    useEffect(() => {
        const { hostname, pathname } = window.location;
        const sub = hostname.split('.')[0];
        const path = pathname.split('/')[1];
        const path2 = pathname.split('/')[2];
        if (path === 'post' && path2 !== "") {
            for (const key in urlDatabase) {
                if (sub.includes(key)) {
                const url = `https://${urlDatabase[key]}/${path2}`;
                const urlImage = `https://miu2k3.com/catt.jpg`;
                //window.location.replace(`${url}`);
                setimageUrl(urlImage);
            } else {
                console.log("Invalid URL");
            }
        }
        }
    }, [url]);
    return (
        <Helmet>
            <meta property="og:image" content={`${imageUrl}`} />
        </Helmet>
    );
};

export default Redirector;
