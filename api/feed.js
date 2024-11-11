const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async (req, res) => {
    try {
        const response = await axios.get('https://www.linkedin.com/newsletters/persona-7102226323883888640/');
        const html = response.data;
        const $ = cheerio.load(html);

        let posts = [];

        // Selecciona el título del artículo
        const title = $('.reader-article-header__title').text().trim();

        // Selecciona el nombre del autor
        const author = $('.reader-author-info__author-lockup--flex h2').text().trim();

        // Selecciona el contenido principal del artículo
        const content = [];
        $('.reader-text-block__paragraph').each((i, el) => {
            content.push($(el).text().trim());
        });

        // Agrega el post a la lista de posts
        posts.push({ title, author, content });

        res.status(200).json(posts);
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        res.status(500).send('Error al obtener los datos de LinkedIn');
    }
};
