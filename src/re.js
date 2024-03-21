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
        const path = pathname.split('/')[1];
        const path2 = pathname.split('/')[2];
        if (path === 'post' && path2 !== "") {
            if (Object.keys(urlDatabase).includes(hostname)) {
                const url = `https://${urlDatabase[hostname]}/${path2}`;
                async function fetchData() {
                    try {
                        const response = await axios.get(`http://localhost:3001/get-html?url=${url}`);
                        const body = await response.data;
                        const $ = cheerio.load(body);
                        const titles = $("meta[property='og:title']").attr('content') || $('title').text();
                        const descriptions = $("meta[property='og:description']").attr('content') || $("meta[name='description']").attr('content');
                        const images = $("meta[property='og:image']").attr('content');
                        if (titles === undefined || titles == "") {
                            titles = $("h1.entry-title").first().text()
                        } if (descriptions === undefined || descriptions == "") {
                            descriptions = $("div.entry-content p").map((index, element) => {
                                return $(element).text();
                            }).get().join(' ');
                        } if (images === undefined || images == "") {
                            images = $('img').attr('src') || '';
                        }
                        setHtmlContent({
                            image: images,
                            title: titles,
                            description: descriptions,
                            url: url
                        });
                        // const htmlContents = `<!DOCTYPE html>
                        // <html>
                        // <head>
                        //   <meta charset="utf-8">
                        //   <title>${title}</title>
                        //   <meta property="og:title" content='${title}'>
                        //   <meta property="og:image" content='${image}'>
                        //   <meta property="og:description" content='${description}'>
                        //   <meta property="og:url" content='${url}'>
                        //   <meta property="og:type" content='website'>
                        // </head>
                        // <body>
                        // <div id="root"></div>
                        //       <script>
                        //         setTimeout(function() {
                        //           location.href = '${url}';
                        //         }, 500);
                        //       </script>
                        //     </body>
                        //   </html>
                        // `;
                        //             console.log(htmlContents)
                        //             setHtmlContent(htmlContents)
                        const script = document.createElement('script');
                        script.innerHTML = `setTimeout(function() {window.location.href = '${url}'}, 100);`;
                        document.body.append(script);
                        return () => { document.body.removeChild(script); };

                    } catch (error) {
                        console.error('Error fetching link preview:', error);
                        throw new Error('Unable to fetch link preview');
                    }
                }
                fetchData();
            } else {
                console.log("Invalid URL");
            }
        }
    }, [url]);
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{`${htmlContent.title}`}</title>
                <meta property="og:title" content={`${htmlContent.title}`} />
                <meta property="og:image" content={`${htmlContent.image}`} />
                <meta property="og:description" content={`${htmlContent.description}`} />
                <meta property="og:url" content={`${htmlContent.url}`} />
            </Helmet>
        </div>
    );
};

export default Redirector;