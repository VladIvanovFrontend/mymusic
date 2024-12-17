const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());

app.get('/search', async (req, res) => {
    try {
        const query = req.query.query;
        if (!query) {
            return res.status(400).json({ error: 'Query parameter is required' });
        }

        const response = await axios.get('https://api.deezer.com/search', {
            params: { q: query },
        });

        if (!response.data || !response.data.data) {
            return res.status(500).json({ error: 'Invalid response from Deezer API' });
        }

        const results = response.data.data.slice(0, 999).map((track) => {
            const previewUrl = track.preview;
            if (!previewUrl) {
                return null;
            }

            return {
                id: track.id,
                title: track.title,
                artist: track.contributors
                    ? track.contributors.map((contributor) => contributor.name).join(', ')
                    : track.artist.name,
                album: track.album.title,
                preview_url: previewUrl,
                image_url: track.album.cover_medium,
            };
        }).filter(track => track !== null);

        res.json(results);
    } catch (error) {
        console.error('Ошибка при запросе:', error.message);
        res.status(500).json({ error: 'Ошибка при запросе к внешнему API' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
