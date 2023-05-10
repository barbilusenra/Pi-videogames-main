// GET | /genres
// Obtiene un arreglo con todos los géneros existentes de la API.
// En una primera instancia, cuando la base de datos este vacía, deberás guardar todos los géneros que encuentres en la API.
// Estos deben ser obtenidos de la API (se evaluará que no haya hardcodeo). Luego de obtenerlos de la API, deben ser guardados en la base de datos para su posterior consumo desde allí.
require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');
const { Genre } = require('../db');

const getGenres = async () => {
    try {
    const apiGenre = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
   // mapeo la respuesta para obtener solo el nombre
   // de cada genero y lo almaceno en un arreglo 'genres'
    const genres = apiGenre.data.results.map((genre) => ({
    //     ^    
            name: genre.name,
        
    }));
// recorro el arreglo de géneros y para cada género uso el metodo findOrCreate
// creando un registro en la tabla 'Genre' de la base de datos si no existe.
   genres.forEach(async (genre) => {
    await Genre.findOrCreate({
        where: {
            name: genre.name,
        },
    });
   });
   let genresList = await Genre.findAll();
   return genresList;
} catch (error) {
    throw new Error(error)
}
};

module.exports = {getGenres};