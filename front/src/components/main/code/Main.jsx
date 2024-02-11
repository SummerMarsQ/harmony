import { Link } from "react-router-dom"
import "../style/Main.scss"
import axios from "axios";
import {useState,useEffect} from "react";
export default function(){

    const [bands,setBands] = useState([])
    useEffect(()=>{
        fetchBands()

    },[])

    const fetchBands = async()=>{
        try{
            const response = await axios.get("http://localhost:8000/api/bands");
            setBands(selectRandomElements(response.data))
        }
        catch(error){
            console.log(error)
        }
    }

const selectRandomElements = (array) =>{
    const count = 13
    const selectedElements = [];
    const tempArray = [...array];
    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * tempArray.length);
        const selectedElement = tempArray.splice(randomIndex, 1)[0];
        selectedElements.push(selectedElement);
    }
    return selectedElements;
}

    function addDotsToLeftSide(integerNumber) {
       
      
        let numStr = String(integerNumber);
        let formattedNumber = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return formattedNumber;
      }
    return(
        <div className="Main">
        <div className="topside">
            <h1>
            WELCOME TO HARMONY
            </h1>
            <p>
            The best music is waiting for you!
            </p>
            <Link to="/list">
                <div className="buttonClass">
                    <button className="Bbutton">
                        Listen
                    </button>
                </div>
            </Link>
        </div>
        <div className="botside">
           <div className="info">
                <svg className="forsvg">
                <path d="M35.0162 65.4712L57.2518 42.1343C57.623 41.7449 57.8301 41.2276 57.8301 40.6896C57.8301 40.1516 57.623 39.6343 57.2518 39.2449L57.2267 39.2198C57.0467 39.0304 56.8301 38.8796 56.59 38.7765C56.35 38.6734 56.0914 38.6203 55.8301 38.6203C55.5689 38.6203 55.3103 38.6734 55.0703 38.7765C54.8302 38.8796 54.6136 39.0304 54.4336 39.2198L33.4961 61.1958L12.567 39.2198C12.387 39.0304 12.1704 38.8796 11.9304 38.7765C11.6903 38.6734 11.4317 38.6203 11.1705 38.6203C10.9092 38.6203 10.6507 38.6734 10.4106 38.7765C10.1705 38.8796 9.95388 39.0304 9.77393 39.2198L9.7488 39.2449C9.37761 39.6343 9.17053 40.1516 9.17053 40.6896C9.17053 41.2276 9.37761 41.7449 9.7488 42.1343L31.9844 65.4712C32.18 65.6765 32.4152 65.8399 32.6757 65.9515C32.9363 66.0632 33.2168 66.1207 33.5003 66.1207C33.7838 66.1207 34.0643 66.0632 34.3249 65.9515C34.5855 65.8399 34.8206 65.6765 35.0162 65.4712Z "></path>
                <path d="M35.0162 44.4712L57.2518 21.1343C57.623 20.7449 57.8301 20.2276 57.8301 19.6896C57.8301 19.1516 57.623 18.6343 57.2518 18.2449L57.2267 18.2198C57.0467 18.0304 56.8301 17.8796 56.59 17.7765C56.35 17.6734 56.0914 17.6203 55.8301 17.6203C55.5689 17.6203 55.3103 17.6734 55.0703 17.7765C54.8302 17.8796 54.6136 18.0304 54.4336 18.2198L33.4961 40.1958L12.567 18.2198C12.387 18.0304 12.1704 17.8796 11.9304 17.7765C11.6903 17.6734 11.4317 17.6203 11.1705 17.6203C10.9092 17.6203 10.6507 17.6734 10.4106 17.7765C10.1705 17.8796 9.95388 18.0304 9.77393 18.2198L9.7488 18.2449C9.37761 18.6343 9.17053 19.1516 9.17053 19.6896C9.17053 20.2276 9.37761 20.7449 9.7488 21.1343L31.9844 44.4712C32.18 44.6765 32.4152 44.8399 32.6757 44.9515C32.9363 45.0632 33.2168 45.1207 33.5003 45.1207C33.7838 45.1207 34.0643 45.0632 34.3249 44.9515C34.5855 44.8399 34.8206 44.6765 35.0162 44.4712Z" fillOpacity="0.5"></path>
                </svg>
                
                <h3>
                    YOU MAY LIKE
                </h3>
                <p>
                    In this list you will see popular groups!
                </p>
            </div> 
            <div className="ex">
            {
                bands?.map((band) =>(

                    <div key={band.id} className="begin">
                        <div className="bandCard">
                        <Link className="forlink" to={"/band/"+band.id}>
                        <div className="fortext">
                            <div className="test">
                                <div className="bandImage">
                                    <div className="bandContainer">
                                        <img src={band.poster} alt={band.name} className="Poster" />
                                        

                                    </div>
                                    <div className="bandListeners">
                                            {addDotsToLeftSide(band.listeners)} listeners per month
                                        </div>
                                </div>
                                
                            </div>
                            <h3> {band.name}</h3>
                            <p> Foundation year: {band.foundationYear}</p>
                        </div>
                        </Link>
                        </div>

                    </div>
                )
                )
            }
            </div>
        </div>
        </div>
    )
}