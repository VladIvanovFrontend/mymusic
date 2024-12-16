const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());

const songs = [
    { title: 'Blinding Lights', artist: 'The Weeknd' },
    { title: 'Shape of You', artist: 'Ed Sheeran' },
    { title: 'Levitating', artist: 'Dua Lipa' },
    { title: 'Save Your Tears', artist: 'The Weeknd' },
    { title: 'Happier', artist: 'Marshmello ft. Bastille' }
];

app.get('/search', (req, res) => {
    const query = req.query.query.toLowerCase();

    const results = songs.filter(song =>
        song.title.toLowerCase().includes(query) || song.artist.toLowerCase().includes(query)
    );

    res.json(results);
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});