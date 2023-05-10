import React from "react";
// import { useDispatch } from "react-redux";
import styled from "./Card.module.css";
import { NavLink } from "react-router-dom";


const Card = ({ game }) => {
  return (
    <div className={styled.card}>
      <NavLink to={`/videogames/${game?.id}`} className={styled.link}>
        <div className={styled.name}>
        <h2 className={styled.h2}>{game?.name}</h2>
        </div>
      </NavLink>
      <div className={styled.datos}>
         <h4>{game?.genres} </h4> 
        <h4 className={styled.rate}>⭐{game?.rating}</h4>
        <h4>
          {"Id: "} {game?.id}
        </h4>
      </div>
      <img
        className={styled.image}
        src={game?.image}
        alt=""        
      />
    </div>
  );
};

export default Card;
