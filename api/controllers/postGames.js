const { Videogame, Genre, genresGames } = require("../db");
require("dotenv").config();
const axios = require("axios");
const { API_KEY } = process.env;
const { Op } = require ("sequelize")
// ------------POST -------------------
const postGames = async (
  name,
  description,
  platforms,
  image,
  genres,
  released,
  rating
) => {
  console.log(name, description, platforms, image, genres, released, rating);
  const [new_game, boolean] = await Videogame.findOrCreate({
    where: {
      name: {[Op.iLike]: `%${name}%`}
    },
    defaults: {
      name,
      description,
      platforms,
      image,
      genres,
      released,
      rating,
    },
  });
  console.log(new_game);
  if (!boolean) throw new Error("The game already exists");
  return new_game;
};
// if(!name || !description || !platforms || !image || !released || !rating ){
//     throw Error ('Missing data')
// }
// const newGame = await Videogame.create({
//     name, description, platforms, image, released, rating
// })

// return newGame;

module.exports = { postGames };
