import React from "react";
import style from './Pagination.module.css' 

function Pagination({ gamesPerPage, videogames, paginado }) {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(videogames / gamesPerPage); i++) {
      pageNumbers.push(i);
    }

    return (     
        <div className={style.paginado}>
          {pageNumbers.map((number) => (
            <div key={number} className={style.number}>
              <a className={style.link} href="#" onClick={() => paginado(number)}>{number}</a>
            </div>
          ))}
        </div>
    
    );
  }

  export default Pagination;