import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetailVideogames } from "../../redux/actions";
import style from "./Detail.module.css";
import { useEffect } from "react";

const Detail = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const gameDetail = useSelector((state) => state.videogamesById);

  let gamed = gameDetail;

  useEffect(() => {
    return dispatch(getDetailVideogames(params.id));
  }, [dispatch, params.id]);
console.log(gamed.genres)
  return (
    <>
      <div className={style.contenedorGeneral}>
        <div className={style.encabezado}>
          <h1 className={style.name}>{gamed.name}</h1>

          <div className={style.info}>
            <img className={style.image} src={gamed.image} alt="" />
            <div className={style.bloque1}>
              <h3 className={style.titulos}>• Genres •</h3>
              <h4>{gamed.genres}</h4>
              <h3 className={style.titulos}>• Release date •</h3>
              <h4>{gamed.released}</h4>
              <h2>⭐{gamed.rating}</h2>             
              <h4> ID: {gamed.id}</h4>
            </div>
            <div className={style.bloque2}>
              <h3 className={style.titulos}>• Platforms •</h3>
              {gamed?.platforms?.map((plat, index) => (
                <p key={index}>► {plat} ◄</p>
              ))}
            </div>
          </div>

          <div>
            <p className={style.description}>{gamed.description}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;


