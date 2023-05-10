require('dotenv').config();
const { Videogame, Genre } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;

// ---------------GET GAMES -------------------

const getGames = async () => {
    let g = [];
    for (let index = 1; index < 6; index++) {
        g = [...g, `https://api.rawg.io/api/games?key=${API_KEY}&page=${index}`];        
    }
 
    let urls = g.map((url) => axios.get(url))
    urls = await Promise.all(urls)
    urls = urls?.map((res) => res.data.results).flat();
    console.log(urls.length)

   // const apiGames = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
   // const games = apiGames.data.results;
     const dbGames = await Videogame.findAll(
        {
            include: {
              model: Genre,
              attributes: ["name"],
              through: {
                attributes: [],
              },
            },
          }
     );   
console.log(dbGames)
      const gameDB = dbGames.map((game) => {
         return {
             id: game.id,
             name: game.name,
             genres: game.Genres?.map((gen) => gen.name),
             platforms: game.platforms?.map((platform) => platform),
             released: game.released,
             image: game.image,
             rating: game.rating,
         };
 })

 
     const gameApi = urls?.map((game) => {
         return {
             id:game.id,
             name: game.name,
             genres: game.genres?.map((gen) => gen.name),
             platforms: game.platforms?.map((plat) => plat.platform.name),
             released: game.released,
             image: game.background_image,
             rating: game.rating
         }
     });

     const allGames =  gameApi.concat(gameDB)

     if(allGames) {
        // console.log(gameApi);
         return allGames
     } else {
         throw Error ("Cannot get the games");
     
        }     
 }


module.exports = {getGames};