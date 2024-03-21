import React, { useEffect, useState } from 'react';

const MyComponent = ({ urlDatabase }) => {
  const [formData, setFormData] = useState({ subdomain: '', path: '' });
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    const handleSubmit = (event) => {
      event.preventDefault();
      const subdomain = formData.subdomain;
      const path = formData.path;

      if (subdomain in urlDatabase) {
        const url = urlDatabase[subdomain];
        const callBackUrl = `${url}/${path}`;
        console.log(callBackUrl);
      } else {
        console.log(`Không tìm thấy URL cho key '${subdomain}' trong database.`);
      }
    };

    const handleChange = (event) => {
      setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleLoad = () => {
      const fullUrl = window.location.href;
      const parsedUrl = new URL(fullUrl);
      const scheme = parsedUrl.protocol;
      const host = parsedUrl.hostname;
      const path = parsedUrl.pathname;

      if (host in urlDatabase) {
        const urlGoc = urlDatabase[host];
        const uri = `${scheme}://${urlGoc}${path}`;

        fetch(uri)
          .then(response => {
            if (!response.ok) {
              throw new Error('Failed to load the page');
            }
            return response.text();
          })
          .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const title = doc.querySelector('title')?.textContent;
            const contentNode = doc.querySelector("main.content");
            const content = contentNode?.textContent || '';
            const images = Array.from(doc.querySelectorAll('img')).map(img => img.getAttribute('src'));

            const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset='utf-8'>
  <title>${title}</title>
  <meta property='og:title' content='${title}'>
  <meta property='og:image' content='${images[0]}'>
  <meta property='og:description' content='${content}'>
  <meta property='og:url' content='${uri}'>
  <meta property='og:type' content='website'>
</head>
<body>
  <script>
    setTimeout(function() {
      //window.location.href = '${uri}'
    }, 500); // thời gian delay là .5 giây
  </script>
</body>
</html>`;

            setHtmlContent(htmlContent);
          })
          .catch(error => {
            console.log("Không thể khởi tạo cURL session. Tự động chuyển hướng.");
            window.location.href = uri;
          });
      } else {
        console.log(`Không tìm thấy URL cho '${host}' trong database.`);
      }
    };

    window.addEventListener('load', handleLoad);

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, [urlDatabase, formData]);

  return (
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
  );
};

export default MyComponent;