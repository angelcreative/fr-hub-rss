const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async (req, res) => {
    try {
        const response = await axios.get('https://www.linkedin.com/newsletters/persona-7102226323883888640/');
        const $ = cheerio.load(response.data);

        let posts = [];
        $('.newsletter-post').each((index, element) => {
            const title = $(element).find('.post-title').text();
            const link = $(element).find('a').attr('href');
            posts.push({ title, link });
        });

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).send('Error al obtener los datos de LinkedIn');
    }
};
