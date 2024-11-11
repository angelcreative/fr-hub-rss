const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async (req, res) => {
    try {
        const response = await axios.get('https://www.linkedin.com/newsletters/persona-7102226323883888640/');
        
        // Imprime el HTML recibido
        const html = response.data;
        console.log(html);

        // Carga el HTML con cheerio
        const $ = cheerio.load(html);

        let posts = [];
        $('.newsletter-post').each((index, element) => {
            const title = $(element).find('.post-title').text();
            const link = $(element).find('a').attr('href');
            posts.push({ title, link });
        });

        res.status(200).json(posts);
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        res.status(500).send('Error al obtener los datos de LinkedIn');
    }
};
