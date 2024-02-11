import { Link } from "react-router-dom"
import "../style/All.scss"
import axios from "axios";
import {useParams} from "react-router-dom"
import {useState,useEffect} from "react";

export default function All(props){
    
    let type = props.type
    const [data, setData] = useState([]);

    const {id} = useParams();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/all/${id}`);
                const shuffledData = shuffleArray(response.data);
                const selectedData = shuffledData.slice(0, shuffledData.length); 
                setData(selectedData);
                console.log(response)
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

return(
        
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
    )
}