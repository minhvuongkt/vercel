import React, { useEffect, useState } from 'react';
import cheerio from 'cheerio';
import axios from 'axios';
import { Helmet } from 'react-helmet';
const Redirector = () => {
    const urlDatabase = {
        "localhost": `lovedogs.boonovel.com`,
    };
    let url
    const [htmlContent, setHtmlContent] = useState('');
    useEffect(() => {
        const { hostname, pathname } = window.location;
        const sub = hostname.split('.')[0];
        const path = pathname.split('/')[1];
        const path2 = pathname.split('/')[2];
        if (path === 'post' && path2 !== "") {
            if (Object.keys(urlDatabase).includes(hostname)) {
                const url = `https://${urlDatabase[hostname]}/${path2}`;
                window.location.replace(`${url}`);
            } else {
                console.log("Invalid URL");
            }
        }
    }, [url]);
};

export default Redirector;
