require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');
const { Videogame, Genre } = require('../db');
const { Op } = require('sequelize');

// GET | /videogames/name?="..."
// Esta ruta debe obtener los primeros 15 videojuegos que se encuentren con la palabra recibida por query.
// Debe poder buscarlo independientemente de mayúsculas o minúsculas.
// Si no existe el videojuego, debe mostrar un mensaje adecuado.
// Debe buscar tanto los de la API como los de la base de datos.

const getNames = async(name) =>{
    try {
// obtenemos los juegos desde la API
    const apiGames= await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`)
    const apiGameList = apiGames.data.results.map((game) =>({
            id: game.id,
            name: game.name,
            genres: game.genres?.map((gen) => gen.name),
            platforms: game.platforms ? game.platforms.map((plat) => plat.platform.name).join(', ') : null,
            released: game.released,
            image: game.background_image,
            rating: game.rating,
            source: 'RAWG API',
    }));
    
// obtenemos los juegos desde la base de datos
    const dbGames = await Videogame.findAll({
        where: {
           name: {
             [Op.iLike]:`%${name}%`,
             },
        },
        include: {
            model: Genre,
            as: 'Genres',
            attributes: ["name"],
            through: {
                attributes: [],
             },              
        },       
    });
    const dbGameList = Array.isArray(dbGames) ? dbGames.map((game) => ({
        id: game.id,
        name: game.name,
        genres: game.genres.map((gen) => gen.name),
        platforms: game.platforms ? game.platforms.split(', ').join(', ') : null,
        released: game.released,
        image: game.image,
        rating: game.rating,
        source: 'DATABASE',
    })) : [];

  const games = apiGameList.concat(dbGameList);   
  if (games.length === 0) {
    return null;
  }
  return games.slice(0, 15); 
}  catch (error) {
    console.error(error);
    throw new Error('Error al buscar los videojuegos.');
  }
};

module.exports = {getNames};