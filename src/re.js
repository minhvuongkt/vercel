import React, { useEffect, useState } from 'react';
import MetaTags from 'react-meta-tags';

const Redirector = () => {
    const urlDatabase = {
        "dog": `lovedogs.boonovel.com`,
        "localhost": `lovedogs.boonovel.com`,
        "imtests": `lovedogs.boonovel.com`,
        "cat": `lovecats.boonovel.com`,
    };
    let url;
    const [imageUrl, setimageUrl] = useState('');
    useEffect(() => {
        const { hostname, pathname } = window.location;
        let sub = hostname;
        if (hostname.includes('.')) {
            sub = hostname.split('.')[0];
        }
        //console.log(sub);
        const path = pathname.split('/')[1];
        const path2 = pathname.split('/')[2];
        if (path === 'post' && path2 !== "") {
            for (const key in urlDatabase) {
                if (sub.includes(key)) {
                    const url = `https://${urlDatabase[key]}/${path2}`;
                    const urlImage = `https://miu2k3.com/catt.jpg`;
                    //window.location.replace(`${url}`);
                    setimageUrl(urlImage);
                }
            }
        } else {
            console.log("Invalid URL");
        }
    }, [url]);
    return (
        <>
            <MetaTags>
                <meta id="og-image" property="og:image" content={`${imageUrl}`} />
            </MetaTags>
        </>
    );
};

export default Redirector;
