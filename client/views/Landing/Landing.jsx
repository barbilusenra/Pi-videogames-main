import styles from "./Landing.module.css"
import { Link } from "react-router-dom";
import rmVideo from "../../assets/pantalla.mp4"
const Landing = () => {
    return (
        <div className={styles.container} >
            <div className={styles.landing}>
                <h1 className={styles.h1land}>Welcome to my Api, Gamer!</h1>
                <Link to="/home">
                    <button className={styles.button}>✦ ✦ PRESS START ✦ ✦</button>
                </Link>
                
                <video src={rmVideo} autoplay="true" muted="true" loop="true" type="video/mp4" />
            </div>
        </div>
    )
};

export default Landing;