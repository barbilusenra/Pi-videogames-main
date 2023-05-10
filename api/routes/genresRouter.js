const {Router} = require('express');
const { getGenres } = require('../controllers/getGenres');

const genresRouter = Router();

genresRouter.get('/', async (req, res) => {
    try {
        let genres = await getGenres();
        res.status(200).json(genres);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

module.exports = {genresRouter};