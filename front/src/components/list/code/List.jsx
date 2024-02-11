import { Link } from "react-router-dom"
import "../style/List.scss"
import axios from "axios";
import {useState,useEffect} from "react";

export default function List(props){
    
    let type = props.type
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = "http://localhost:8000/api/"+type
                const response = await axios.get(url);
                const shuffledData = shuffleArray(response.data);
                const selectedData = shuffledData.slice(0, shuffledData.length); 
                setData(selectedData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
    
        fetchData();
    }, [type]);
    
    const shuffleArray = (array) => {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    };

    const handleChange = (value) => {
        type = value
    }

 if(type === "albums")   return(
        
        <div className="list">
            <div className="button-container">
            <Link className="oval-button" to="/list/bands" onClick={() => handleChange('bands')}>Bands</Link>
            <Link className="oval-button" to="/list/albums" onClick={() => handleChange('albums')}>Albums</Link>
            </div>
            <div className="ex">
            {
                data?.map((album) =>(

                    <div key={album.id} className="begin">
                        <div className="bandCard">
                        <Link className="forlink" to={"/album/"+album.id}>
                        <div className="fortext">
                            <div className="test">
                                <div className="bandImage">
                                    <div className="bandContainer">
                                        <img src={album.poster} alt={album.name} className="Poster" />
                                    
                                    </div>
                                    <div className="bandListeners">
                                            Released : {album.date} {album.year}
                                        </div>
                                </div>
                                
                            </div>
                            <h4> {album.name}</h4>
                            <p> {album.bandName}</p>
                        </div>
                        </Link>
                        </div>

                    </div>
                )
                )
            }
            </div>
        </div>
    )
else if(type === "bands") return(
    <div className="list">
            <div className="button-container">
            <Link className="oval-button" to="/list/bands" onClick={() => handleChange('bands')}>Bands</Link>
            <Link className="oval-button" to="/list/albums" onClick={() => handleChange('albums')}>Albums</Link>
            </div>
            <div className="ex">
            {
                data?.map((band) =>(

                    <div key={band.id} className="begin">
                        <div className="bandCard">
                        <Link className="forlink" to={"/band/"+band.id}>
                        <div className="fortext">
                            <div className="test">
                                <div className="bandImage">
                                    <div className="bandContainer">
                                        <img src={band.poster} alt={band.name} className="Poster1" />
                                    
                                    </div>
                                    <div className="bandListeners">
                                            Listeners : {band.listeners}
                                        </div>
                                </div>
                                
                            </div>
                            <h4> {band.name}</h4>
                            <p> Foundation : {band.foundationYear}</p>
                        </div>
                        </Link>
                        </div>

                    </div>
                )
                )
            }
            </div>
        </div>

)
}