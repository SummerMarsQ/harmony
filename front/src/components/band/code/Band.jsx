import {useParams} from "react-router-dom"
import { useEffect , useState,useCallback } from "react";
import axios from "axios";
import "../style/Bandinfo.scss"
import "../style/Bandtop.scss"
import "../style/popularsongs.scss"
import {Link} from "react-router-dom";
import "../style/otheralbums.scss";
import copy from 'clipboard-copy';
import Photo from "../../../images/share22.png"
export default function Band({user, onSongSelect }){
 
    let ord = 0;
    const {id} = useParams();
    const userId = user
    const [band , setBand] = useState()
    const [allAlbums,setAllAlbums] = useState([])
    const [songs , setSongs] = useState([])
    const [liked, setLiked] = useState(false)
    const fetchData = useCallback(async () => {
        try {
            const [bandResponse, songsResponse, bandsResponse] = await Promise.all([
                axios.get(`http://localhost:8000/api/band/${id}`),
                axios.get(`http://localhost:8000/api/band/${id}/songs`),
                axios.get(`http://localhost:8000/api/band/${id}/albums`)
            ]);
    
            if (bandResponse) {
                setBand(bandResponse.data);
                if (songsResponse) {
                    setSongs(songsResponse.data);
                }
                if (bandsResponse) {
                    setAllAlbums(bandsResponse.data);
                }
            } else {
                console.error("Error fetching data");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }, [id]);
    
    useEffect(() => {
        fetchData();
    }, [id]);

    const handleMore = async () => {
        try {
            const currentURL = window.location.href;
            await copy(currentURL);
        } catch (error) {
            console.error('Error copying link:', error);
        }
    };

    const handleLike = async () => {
        if(userId !== null)
        {
            
            try {
                
                const preferenceId = band.id;
              if (!liked) {
                await axios.post(`http://localhost:8000/api/like`,{userId,preferenceId});
                setLiked(true);
              } 
              else{
                await axios.delete(`http://localhost:8000/api/unlike?userId=${userId}&preferenceId=${preferenceId}`);
                setLiked(false);
              }
              
                
            } catch (error) {
              console.error('Error liking album:', error);
            }
        }
        
      };

    function formatDate(date, year) {
        const months = [
            "jan", "feb", "mar", "apr", "may", "jun",
            "jul", "aug", "sep", "oct", "nov", "dec"
        ];
    
        const [day, month] = date.split(".");
        const monthIndex = parseInt(month) - 1;
        const monthName = months[monthIndex];
        
        return `${day} ${monthName} ${year}`;
    }
    function addDotsToLeftSide(integerNumber) {
       
      
        let numStr = String(integerNumber);
        let formattedNumber = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return formattedNumber;
      }

      const handleSong = async () => {
        const selectedSongs = songs.map(song => ({ name: song.name, link: song.link }));
        
        onSongSelect(selectedSongs);
    };
    return (
        <div className="band">
            {
                band?(
                    <>
                    <div className="info2">
                    <div className="info">
            <div className="forimg">
            <img src={band.poster} alt="" />
            </div>
            <div className="numbers">
            <span className="title">
            <h1>{band.name}</h1>
            </span>
                
                <span className="listeners">
                {addDotsToLeftSide(band.listeners)} listeners per month
                </span>
            
            </div>
           
            </div>
            </div>
            <div className="top">
                <div className="foruser">
                <div className="playdiv">
                <button className="playbtn" onClick={handleSong}>
                    <span className="playspan1">
                        <span className="playspan2" aria-hidden="true">
                            <svg className="play" role="img" height="28" width="28" aria-hidden="true" viewBox=" 0 0 24 24" data-encore-id="icon">
                            <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path>
                                
                            </svg>
                        </span>
                    </span>
                </button>
                </div>
                <button className={` ${liked ? "buttonsub1" : "buttonsub2"}`} onClick={handleLike}>
                 {`${liked ? 'Subscribed' : 'Subscribe'}`}
                </button>
                <button className="morebtn">
                    <span className="morespan1">
                    <img src={Photo} onClick={handleMore} className="more" role="img" height="32" width="32" aria-hidden="true" viewBox=" 0 0 24 24" data-encore-id="icon"/>
                    </span>
                </button>
                </div>
                    <div className="forh1">
                <h1>Popular songs</h1>
                </div>
                <div className="popularsongs">
                { 
                    songs?.map((songg) => (
                    <div className="songswithall">
                        <div className="number">
                            <p>{++ord}</p>
                            
                        </div>
                        <div className="photoband">
                            <Link to={"/album/"+songg.album}>
                            <img src={songg.albumPoster} alt="" />
                            </Link>
                        </div>
                        <div className="songname">
                            <Link to={"/song/"+songg.id} className="forlink">
                            <h1>{songg.name}</h1>
                            </Link>
                        </div>
                        <div className="audiosnumber">
                            <h3>{addDotsToLeftSide(songg.audios)}</h3>
                        </div>
                        <div className="songduration">
                            <h2>{songg.duration}</h2>
                        </div>
                        </div>
                    ))
                    }
                </div>
                <div className="msgother">
                    <div className="leftside">
                        <Link className="forlink" to={"/all/"+band.id}>
                            <h1>{band.name}: albums</h1>
                            </Link>
            
                </div>
                </div>
                <div className="otheralbums">
                {
                allAlbums?.map((album) =>(

                    <div key={album._id} className="begin">
                        <div className="bandCard">
                        <Link className="forlink" to={"/album/"+album.id}>
                        <div className="fortext">
                            <div className="test">
                                <div className="bandImage">
                                    <div className="bandContainer">
                                        <img src={album.poster} alt={album.name} className="Poster" />
                                    
                                    </div>
                                    <div className="bandListeners">
                                            Released : {formatDate(album.date,album.year)}
                                        </div>
                                </div>
                                
                            </div>
                            <p> {album.name}</p>
                        </div>
                        </Link>
                        </div>

                    </div>
                )
                )
            }
                </div>
                </div>

            </>
                ):
                ""
            }
        </div>
    )
}