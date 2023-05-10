const { Router } = require("express");
const {getGames} = require("../controllers/getGames");
// const { getGenres } = require("../controllers/GenresControllers");
const {postGames} = require("../controllers/postGames");
const {getGamesId} = require('../controllers/getGamesId');
const {getNames} = require('../controllers/getNames');
const { Genre } = require("../db");

const videogamesRouter = Router();

videogamesRouter.get("/", async (req, res) => {
  const { name } = req.query
    try {
        let gamesName = null;
        if(name) {         
            gamesName = await getNames(name); 
            if(gamesName === null) {
                res.status(404).json({message: `No se encontraron resultados para "${name}".`});
                return;
            }
            res.status(200).json(gamesName);
            return;
        }
    // si no se proporciona un nombre en la consulta, obtener todos los juegos de la base de datos
    const allGames = await getGames();
    res.status(200).json(allGames);
  } catch (error) {
    res.status(500).json({error: error.message})
  }
});

videogamesRouter.get('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const gamesId = await getGamesId(id);
        if (Array.isArray(gamesId)) {
            res.status(200).json(gamesId[0]);
        } else{
            res.status(200).json(gamesId);
        }        
    } catch (error) {
        console.log(error)
        res.status(500).json({error: error.message});
    }
});

videogamesRouter.post("/", async (req, res) => {
    const { name, description, platforms, image, genres, released, rating } = req.body
     try {
        const new_game = await postGames(name, description, platforms, image, genres, released, rating)

        const genresDb = await Genre.findAll({
            where: {
                name: genres
            }
        })
        console.log("*********",genres)
        new_game.addGenre(genresDb)

        res.status(200).json(new_game)
    } catch (error) {
        
        res.status(500).json({error: error.message});
    }
});


module.exports = {videogamesRouter};