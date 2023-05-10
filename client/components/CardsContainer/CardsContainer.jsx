// este componente debe tomar un array de usuarios,
// y por cada usuario, renderizar un componente Card
import Card from '../Card/Card';
import styles from "./CardsContainer.module.css";


function CardsContainer({videogames}) {
    const gamesList = videogames;
        
    return(
        
        <div className={styles.cards} >
            
         {gamesList?.map((game) => (
            <Card 
            key={game.id}
            game={game}
             />
         ))}
        </div>
    );
}
 

export default CardsContainer;