import { Link } from "react-router-dom";
import style from "./NavBar.module.css";
import { getVideogames } from "../../redux/actions";
import { useDispatch } from "react-redux";
import SearchBar from "../SearchBar/SearchBar";


const NavBar = () => {

    const path = window.location.pathname;
    const dispatch = useDispatch();
    const pathSearch = "/home";

    const handleRefresh = (e) => {
        dispatch(getVideogames(e));
    }

    return(
        <nav>
        <div className={style.mainConteiner}>
            <Link to="/home" className={style.home}>HOME</Link>
            <Link to="/create"  className={style.home}>CREATE VIDEOGAME</Link>
            <button className={style.buttonCont} onClick={e => handleRefresh(e)}><b className={style.refresh}>REFRESH</b></button>

            {path === pathSearch ? <SearchBar /> : null}
        </div>
        </nav>
    )
}

export default NavBar;