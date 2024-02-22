//
// links.js
//
// Created by Caleb on 2024-02-21
//

// Import libraries
const router = require('express').Router();

router.get('/', async (req, res) => {
    const urlToConvert = req.query.url;

    const endpoint = `https://api.song.link/v1-alpha.1/links?`;
    const params = new URLSearchParams({
        url: urlToConvert,
    });
    const fetchURL = endpoint + params;

    try {
        const response = await fetch(fetchURL);

        if (response.ok) {
            const data = await response.json();
            res.status(200).json(parse(data));
        } else {
            console.log(await response.json());
            res.sendStatus(response.status);
        }
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

function parse(data) {
    const response = {};
    response.links = {};

    const original = data.entitiesByUniqueId[data.entityUniqueId];

    response.title = original.title;
    response.type = original.type;
    response.artist = original.artistName;
    response.imageURL = original.thumbnailUrl;

    const supportedPlatforms = [
        'amazonMusic',
        'appleMusic',
        'itunes',
        'spotify',
        'tidal',
        'youtube',
        'youtubeMusic',
    ];

    for (const platform of supportedPlatforms) {
        const url = data.linksByPlatform[platform]?.url;
        response.links[platform] = url;
    }

    return response;
}

// Export the module(s)
module.exports = router;
