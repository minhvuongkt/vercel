// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors()); // Sử dụng CORS middleware để cho phép truy cập từ các domain khác

app.get('/get-html', async (req, res) => {
    try {
        const { url } = req.query;
        if (!url) {
            return res.status(400).json({ error: 'Missing URL parameter' });
        }

        const response = await axios.get(url);
        res.send(response.data);
    } catch (error) {
        console.error('Error fetching HTML:', error);
        res.status(500).json({ error: 'Error fetching HTML' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});