import { Link } from "react-router-dom"
import {useParams} from "react-router-dom"
import "../style/search.scss"
import axios from "axios";
import {useState,useEffect} from "react";

export default function Search(){
    
    const {id} = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/search/${id}`)
                const shuffledData = shuffleArray(response.data);
                const selectedData = shuffledData.slice(0, shuffledData.length); 
                setData(selectedData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
    
        fetchData();
    },[id]);
    
    const shuffleArray = (array) => {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    };

    
return(
    <div className="list">
            <div className="button-container">
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