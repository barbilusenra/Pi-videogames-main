import { useDispatch } from "react-redux";
import { getVideogamesByName } from "../../redux/actions";
import { useState } from "react";
import style from "./SearchBar.module.css";
import searchimg from "../../assets/mouse.png";

export default function SearchBar() {
    let [name, setName] = useState("");
    const dispatch = useDispatch()

     const handleChange = (event) => {
         event.preventDefault();
         setName(event.target.value);
     }

    // function handleSubmit(e) {
    //     e.preventDefault();
    //     var search = getVideogamesByName(name);
    //     dispatch(search);
    //     setName("");       
    // }
  
   function handleSubmit(event) { 
    event.preventDefault();
    dispatch(getVideogamesByName(name)) 
      }

    return(
        <div className={style.containerSearch}>
            <input
               type="search"
               placeholder=" E.g. 'The witcher'"
               onChange={ (event) => handleChange(event)}
            //    onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
               value={name}
            />            
            <button  type="submit" onClick={(event) => handleSubmit(event) }> 
                <b className={style.search}>
                    <img src={searchimg} alt="search" />    
                </b> 
            </button>
        </div>
    )
}