import {useParams} from "react-router-dom"
import { useEffect , useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom"
import "../style/Songinfo.scss"
import "../style/Songbot.scss"
import "../style/otheralbums.scss"
import copy from 'clipboard-copy';
import Photo from "../../../images/share22.png"
export default function Song({user, onSongSelect }){
    const userId = user
    const {id} = useParams();
    const [song , setSong] = useState()
    const [albums , setAlbums] = useState([])

    const [liked, setLiked] = useState(false)
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const songResponse = await axios.get(`http://localhost:8000/api/song/${id}`);
                const songData = songResponse.data;
                if (songData) {
                    setSong(songData);
    
                    const albumsResponse = await axios.get(`http://localhost:8000/api/album/otheralbums/${songData.bandId}`);
                    const albumsData = albumsResponse.data;
    
                    if (albumsData) {
                        setAlbums([...shuffleArray(albumsData).slice(0, 5)]);
                    }
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchData()
    },[id])

    const handleLike = async () => {
        if(userId !== null)
        {
            
            try {
                
                const preferenceId = song.id;
              if (!liked) {
                await axios.post(`http://localhost:8000/api/like`,{userId,preferenceId});
                setLiked(true);
              } 
              else{
                await axios.delete(`http://localhost:8000/api/unlike?userId=${userId}&preferenceId=${preferenceId}`);
                setLiked(false);
              }
              
                
            } catch (error) {
              console.error('Error liking song:', error);
            }
        }
        
      };

function shuffleArray(arr) {
    const shuffledArr = arr.slice();
  
    for (let i = shuffledArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArr[i], shuffledArr[j]] = [shuffledArr[j], shuffledArr[i]];
    }
  
    return shuffledArr;
  }

  const handleMore = async () => {
    try {
        const currentURL = window.location.href;
        await copy(currentURL);
    } catch (error) {
        console.error('Error copying link:', error);
    }
};
function addDotsToLeftSide(integerNumber) {
       
      
    let numStr = String(integerNumber);
    let formattedNumber = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return formattedNumber;
  }

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

const handleSong = async () => {
    
    onSongSelect([{ name: song.name, link:song.link}]);
  };
    return (
        <div className="song">
            {
            song? 
            (
                <>
            <div className="info">
            <div className="forimg">
            <img src={song.albumPoster} alt="" />
            </div>
            <div className="numbers">
            <span className="type">Single</span>
            <span className="title">
            <h1>{song.name}</h1>
            </span>
            <div className="line">
                <div className="photo">
                <img src={song.bandPoster} alt="" />
                <span className="text">
                <Link className="forlink" to={"/band/"+song.bandId}>
                {song.bandName}
                </Link>
                </span>
                </div>
                <div className="dot"></div>
                <span className="album">
                    <Link className="forlink" to={"/album/"+song.albumId}>
                        {song.albumName}
                        </Link>
                </span>
                
            </div>
            
            </div>
           
            </div>
            <div className="other">
                
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
                <button className="likebtn" onClick={handleLike}>
                    <span className="likespan1">
                        <svg className={` ${liked ? "like2" : "like"}`} role="img" height="32" width="32" aria-hidden="true" viewBox=" 0 0 24 24" data-encore-id="icon">
                        <path d="M5.21 1.57a6.757 6.757 0 0 1 6.708 1.545.124.124 0 0 0 .165 0 6.741 6.741 0 0 1 5.715-1.78l.004.001a6.802 6.802 0 0 1 5.571 5.376v.003a6.689 6.689 0 0 1-1.49 5.655l-7.954 9.48a2.518 2.518 0 0 1-3.857 0L2.12 12.37A6.683 6.683 0 0 1 .627 6.714 6.757 6.757 0 0 1 5.21 1.57zm3.12 1.803a4.757 4.757 0 0 0-5.74 3.725l-.001.002a4.684 4.684 0 0 0 1.049 3.969l.009.01 7.958 9.485a.518.518 0 0 0 .79 0l7.968-9.495a4.688 4.688 0 0 0 1.049-3.965 4.803 4.803 0 0 0-3.931-3.794 4.74 4.74 0 0 0-4.023 1.256l-.008.008a2.123 2.123 0 0 1-2.9 0l-.007-.007a4.757 4.757 0 0 0-2.214-1.194z"></path>
                        </svg>
                    </span>
                </button>
                <button className="morebtn" >
                    <span className="morespan1">
                        <img src={Photo} onClick={handleMore} className="more" role="img" height="32" width="32" aria-hidden="true" viewBox=" 0 0 24 24" data-encore-id="icon"/>
                    
                    </span>
                </button>
                </div>
                </div>
                <div className="bot" >
                <div className="topside" >
                    <div className="info2" >
                        <div className="tag">#</div>
                        <div className="name">
                                <span className="forname">Name</span>
                        </div>
                        <div className="audio">
                            <div className="foraudio">Audios</div>
                        </div>
                        <div className="time">
                                <svg className="timee" role="img" height="16" width="16" aria-hidden="true" viewBox=" 0 0 16 16" >
                                    <path d = "M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"></path>
                                    <path d ="M8 3.25a.75.75 0 0 1 .75.75v3.25H11a.75.75 0 0 1 0 1.5H7.25V4A.75.75 0 0 1 8 3.25z"></path>
                                </svg>
                        </div>
                    </div>
                    <div className="line"></div>
                    <div className="songswithall">
                        <div className="number">
                            <p>1</p>
                            
                        </div>
                        <div className="songname">
                            <h1>{song.name}</h1>
                        </div>
                        <div className="audiosnumber">
                            <h3>{addDotsToLeftSide(song.audios)}</h3>
                        </div>
                        <div className="songduration">
                            <h2>{song.duration}</h2>
                        </div>
                    </div>
                    <div className="date">
                    <h1>{formatDate(song.date,song.year)}</h1>
                    </div>
                </div>
                </div>
                <div className="msgother">
                    <div className="leftside">
                        <Link className="forlink"><h1>{song.bandName}: other albums</h1></Link>
            
                </div>
                <div className="rightside">
                    <Link className="forlink"><h4>Open discography</h4></Link>
                    
                </div>
                </div>
                <div className="otheralbums">
                {
                albums?.map((album) =>(

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
                                            Released : {formatDate(album.date,album.year)}
                                        </div>
                                </div>
                                
                            </div>
                            <h3> {song.bandName}</h3>
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
            )
            :
            ""
    }
        </div>
    )

}