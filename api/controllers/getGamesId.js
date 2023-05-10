require("dotenv").config();
const { API_KEY } = process.env;
const axios = require("axios");
const { Videogame, Genre } = require("../db");

// ----------- GET NAMES BY ID -------------
// GET | /videogames/:idVideogame
// Esta ruta obtiene el detalle de un videojuego específico. Es decir que devuelve un objeto con la información pedida en el detalle de un videojuego.
// El videojuego es recibido por parámetro (ID).
// Tiene que incluir los datos del género del videojuego al que está asociado.
// Debe funcionar tanto para los videojuegos de la API como para los de la base de datos.                                 gos de la API como para los de la base de datos.

const getGamesId = async (id) => {
  console.log(id);
  if (!id.includes("-")) {
    const apiGames = await axios.get(
      `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
    );
    const game = apiGames.data;
    console.log(apiGames);
    return {
      id: game.id,
      name: game.name,
      description: game.description,
      genres: game.genres?.map((gen) => gen.name),
      platforms: game.platforms?.map((plat) => plat.platform.name),
      released: game.released,
      image: game.background_image,
      rating: game.rating,
    };
  } else {
    const dbGame = await Videogame.findByPk(id, {
      include: { model: Genre, attributes: ["name"] },
    });
    console.log(dbGame);
    if (dbGame) {
      return {
        id: dbGame.id,
        name: dbGame.name,
        genres: dbGame.Genres?.map((gen) => gen.name),
        platforms: dbGame.platforms?.map((platform) => platform),
        released: dbGame.released,
        image: dbGame.image,
        rating: dbGame.rating,
      };
    } else {
      return "Game not found";
    }
  }
};

module.exports = { getGamesId };
