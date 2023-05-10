import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { useDispatch, useSelector } from "react-redux";
import {
  orderCards,
  filterGenres,
  getVideogames,
  getGenres,
  filterOrigin,
  getGamesOrderRating,
} from "../../redux/actions";

import load from "../../assets/load.gif";
import Pagination from "../../components/Pagination/Pagination";


export default function Home() {
  const dispatch = useDispatch();
  const videogames = useSelector((state) => state.videogames);
  const genres = useSelector((state) => state.genres);


// paginado
  const[currentePage, setCurrentPage] = useState(1);
  const[gamesPerPage] = useState(15);
  const indexofLastCard = currentePage*15 //15
  const indexofFirstCard = indexofLastCard - gamesPerPage;
  const currentCards = videogames.slice(indexofFirstCard,indexofLastCard);

  const paginado = (pageNumber) =>{
    setCurrentPage(pageNumber)
  }

  // Orden por rating
  const gameOrderRating = (event) => {
    dispatch(getGamesOrderRating(event.target.value));
  };

  // para ordenar alfabeticamente

  const gameOrderAlph = (event) => {
    dispatch(orderCards(event.target.value));
  };

  useEffect(() => {
    dispatch(getVideogames());
    dispatch(getGenres());
  }, [dispatch]);

  return (
    <div>
      <div className={styles.filterContainer}>
        <div className={styles.filter}>
          <label>Genres:</label>
          <select onChange={(e) => dispatch(filterGenres(e.target.value))}>
            <option>Select Option</option>
            {genres.map((e, i) => (
              <option value={e.name} key={i}>
                {e.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.filter}>
          <label>Origin:</label>
          <select onChange={(e) => dispatch(filterOrigin(e.target.value))}>
            {["Select Option", "Api", "Local"].map((e, i) => (
              <option value={e} key={i}>
                {e}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.filter}>
        <label>Order:</label>
          <select onChange={gameOrderAlph}>
            <option select disabled selected={true}>
              A-Z / Z-A
            </option>
            <option value="Ascendente">Ascendent</option>
            <option value="Descendente">Descendent</option>
          </select>
        </div>
        <div className={styles.filter}>
          <label>Order By Rating:</label>
          <select className={styles.filter} onChange={gameOrderRating}>
            <option select disabled selected={true}>
              ⭐
            </option>
            <option value="Ascendente">Ascendente</option>
            <option value="Descendente">Descendente</option>
          </select>
        </div>
      </div>
      {!videogames.length ? (
        <div>
          {" "}
          <img className={styles.image} src={load} alt="loading" />{" "}
          <h2 className={styles.loading}>Loading...</h2>{" "}
        </div>
      ) : (
      <div>     
      <CardsContainer videogames={currentCards} /> 
      <Pagination gamesPerPage={gamesPerPage}
      videogames={videogames.length}
      paginado={paginado} />
    
      </div> 
      )} 

   
    </div>
  );
}




// import { useEffect, useState } from "react";
// import {
//  getVideogames,
// } from "../../redux/actions";
// import { useDispatch, useSelector } from "react-redux";
// import CardsContainer from "../../components/CardsContainer/CardsContainer";
// //import NavBar from "../../components/NavBar/NavBar";
// import styled from "./Home.module.css";
// import load from "../../assets/load.gif";
// import FilterGenre from "../../components/Filter/FilterGenre";

// const Home = () => {
//   const dispatch = useDispatch();
//   const videogames = useSelector((state) => state.videogames);

//   const[filter, setFilter] = useState({genres:""});
//   //  para cambiar el estado en genres
//   const [filteredVideogames, setFilteredVideogames] = useState([]);

//   useEffect(() => {
//     dispatch(getVideogames());
//    }, [dispatch]);
//   // cuando se monta, que haga el dispatch
//   // useEffect()    -   useDispatch()

//   useEffect(() => {
//     setFilteredVideogames(videogames)
//   }, [videogames]);
// // actualizamos el estado de videogames. y lo traemos a setfilteredvideogames
// // ahora todos mis datos los tiene este nuevo setFIlteredVideogames

//   const handleFilterGenre = (e) => {
//     const property = e.target.name;
//     // cuando selecciono un genero me lo guardo en mi nueva constante property-
//     const value = e.target.value;
//     // este value es el que me trae el cambio
//     setFilter({filter, [property]:value});
//   };

//   useEffect(() => {
//     setFilteredVideogames(videogames);
//     if(filter.genres) {
//       const filtered = videogames.filter((game) =>
//       game.genres.includes(filter.genres))
//       setFilteredVideogames(filtered)
//   }}, [videogames, filter.genres]);

//   return (
//     <>
//       <div onChange={handleFilterGenre}>
//           <FilterGenre />

//         </div>
//         {!videogames.length ? (
//         <div>
//           {" "}
//           <img className={styled.image} src={load} alt="loading" />{" "}
//           <h2 className={styled.loading}>Loading...</h2>{" "}
//         </div>
//       ) : (
//         <CardsContainer videogames={filteredVideogames} />
//       )}
//       <div>

//       </div>
//     </>
//   );
// };

// export default Home;

// const Home = () => {
//   const dispatch = useDispatch();
//   const videogames = useSelector((state) => state.videogames);
//   const [filters, setFilters] = useState({
//     genres: "",
//     platforms:""
//   });
//   const [filteredVideogames, setFilteredVideogames] = useState([]);

//   useEffect(() => {
//     dispatch(getVideogames());
//   }, [dispatch]);

//   useEffect(() => {
//     setFilteredVideogames(videogames);
//   }, [videogames]);

//   const handleChange = (e) => {
//     const property = e.target.name;
//     const value = e.target.value;
//     setFilters({ ...filters, [property]: value });
//   };

//   const HandleClick = (e) => {
//     e.preventDefault();
//     if (e.target.name === "apply") {
//       dispatch(getnamesbyGenre(filters.genres));
//       dispatch(getnamesbyplatforms(filters.platforms));
//     }
//   };

//   useEffect(() => {
//     setFilteredVideogames(videogames);
//     if (filters.genres) {
//       const filtered = videogames.filter((game) =>
//         game.genres.includes(filters.genres)
//       );
//       setFilteredVideogames(filtered);
//     }
//   }, [videogames, filters.genres]);

//   return (
//     <div className={style.container}>
//       <>
//         <SearchBar></SearchBar>
//         <div onChange={handleChange}>
//           <GenreSelect></GenreSelect>
//           <PlatformSelect></PlatformSelect>
//         </div>
//         <div onClick={HandleClick}>

//         </div>
//         <CardContainer videogames={filteredVideogames} />
//       </>
//     </div>
//   );
// };

// export default Home;
