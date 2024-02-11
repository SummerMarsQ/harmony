import {useParams} from "react-router-dom"
import { useEffect , useState ,useCallback} from "react";
import axios from "axios";
import {Link} from "react-router-dom"
import "../style/Albuminfo.scss"
import "../style/Albumsongs.scss"
import "../style/otheralbums.scss"
import copy from 'clipboard-copy';
import Photo from "../../../images/share22.png"
export default function Album({user, onSongSelect }){
    let ord = 0;
    const userId = user
    const {id} = useParams();
    
    const [album , setAlbum] = useState()
    const [songs, setSongs] = useState([])
    const [albums , setAlbums] = useState([]) 
    const [liked, setLiked] = useState(true);
 
    
        const fetchAlbums = useCallback(async () => {
            try {
                const [albumResponse,songsResponse,responseLike] = await Promise.all([
                    axios.get(`http://localhost:8000/api/album/${id}`),
                    axios.get(`http://localhost:8000/api/album/songs/${id}`),
                    axios.get(`http://localhost:8000/api/liked?userId=${userId}&preferenceId=${id}`)
                ]);
        const albumData = albumResponse.data;
        if (responseLike) setLiked(responseLike.data.response)
        if (albumData) {
        setAlbum(albumData);

        
        const songsData = songsResponse.data;
    
        if (songsData) setSongs(songsData);

        const responseAlbums = await axios.get(`http://localhost:8000/api/album/otheralbums/${albumData.band_id}`);
        const albumsData = responseAlbums.data;
        
        if (albumsData){
            setAlbums([...(shuffleArray(albumsData)).slice(0,5)]);
        }
  }
        } catch (error) {
            console.error(error);
        }
        },[id]);

        useEffect(() => {
            fetchAlbums();
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
                
                const preferenceId = album.id;
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
    const type = (array) => {
        if(array.length >=7){
            return "Album"
        }
        return "EP"
    }
    function shuffleArray(arr) {
        const shuffledArr = arr.slice();
      
        for (let i = shuffledArr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledArr[i], shuffledArr[j]] = [shuffledArr[j], shuffledArr[i]];
        }
      
        return shuffledArr;
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
    function addDotsToLeftSide(integerNumber) {
       
      
        let numStr = String(integerNumber);
        let formattedNumber = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return formattedNumber;
      }

      function sumDurations(durationsArray) {
        function timeToSeconds(time) {
          var parts = time.split(":");
          return parseInt(parts[0]) * 60 + parseInt(parts[1]);
        }
      
        var totalSeconds = durationsArray.reduce(function (sum, item) {
          return sum + timeToSeconds(item.duration);
        }, 0);
      
        function secondsToTime(seconds) {
          var minutes = Math.floor(seconds / 60);
          var remainingSeconds = seconds % 60;
          return minutes + " min " + remainingSeconds + " sec";
        }
      
        return secondsToTime(totalSeconds);
      }

      const handleSong = async () => {
        const selectedSongs = songs.map(song => ({ name: song.name, link: song.link }));
        
        onSongSelect(selectedSongs);
    };
    return (
        <div className="album">
            
            {
                album? 
                (
                <>
            <div className="info">
            <div className="forimg">
            <img src={album.poster} alt="" />
            </div>
            <div className="numbers">
            <span className="type">{type(songs)}</span>    
            <span className="title">
            <h1>{album.name}</h1>
            </span>
            <div className="line">
                <div className="photo">
                <img src={album.bandPoster} alt="" />
                <span className="text">
                <Link className="forlink" to={"/band/"+album.band_id}>
                {album.bandName}
                </Link>
                </span>
                <div className="dot"></div>
                <span className="text">
                <Link className="forlink" to={"/genre/"+album.genre}>
                {album.genre}
                </Link>
                </span>
                </div>
                <div className="dot"></div>
                <span className="tracks">
             {songs.length} songs , {sumDurations(songs)} 
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
                <button className="likebtn" onClick={handleLike} >
                    <span className="likespan1">
                        <svg style={{ fill: liked ? "#ff007a" : "white"}} role="img" height="32" width="32" aria-hidden="true" viewBox=" 0 0 24 24" data-encore-id="icon">
                        <path d="M5.21 1.57a6.757 6.757 0 0 1 6.708 1.545.124.124 0 0 0 .165 0 6.741 6.741 0 0 1 5.715-1.78l.004.001a6.802 6.802 0 0 1 5.571 5.376v.003a6.689 6.689 0 0 1-1.49 5.655l-7.954 9.48a2.518 2.518 0 0 1-3.857 0L2.12 12.37A6.683 6.683 0 0 1 .627 6.714 6.757 6.757 0 0 1 5.21 1.57zm3.12 1.803a4.757 4.757 0 0 0-5.74 3.725l-.001.002a4.684 4.684 0 0 0 1.049 3.969l.009.01 7.958 9.485a.518.518 0 0 0 .79 0l7.968-9.495a4.688 4.688 0 0 0 1.049-3.965 4.803 4.803 0 0 0-3.931-3.794 4.74 4.74 0 0 0-4.023 1.256l-.008.008a2.123 2.123 0 0 1-2.9 0l-.007-.007a4.757 4.757 0 0 0-2.214-1.194z"></path>
                        </svg>
                    </span>
                </button>
                <button className="morebtn">
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
                            <div className="foraduio">Audios</div>
                        </div>
                        <div className="time">
                                <svg className="timee" role="img" height="16" width="16" aria-hidden="true" viewBox=" 0 0 16 16" >
                                    <path d = "M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"></path>
                                    <path d ="M8 3.25a.75.75 0 0 1 .75.75v3.25H11a.75.75 0 0 1 0 1.5H7.25V4A.75.75 0 0 1 8 3.25z"></path>
                                </svg>
                        </div>
                    </div>
                    <div className="line"></div>
                    <div className="allsongs">
                    {
                    songs?.map((songg) => (
                    <div key={songg.id}  className="songswithall">
                        <div className="number">
                            <p>{++ord}</p>
                            
                        </div>
                        <div className="songname">
                            <Link className="forlink" to={"/song/"+songg.id}>
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
                    <div className="date">
                    <h1>{formatDate(album.date,album.year)}</h1>
                    </div>
                </div>
                </div>
                <div className="msgother">
                    <div className="leftside">
                        <Link className="forlink" to={"/all/"+album.band_id}><h1>{album.bandName}: other albums</h1></Link>
            
                </div>
                <div className="rightside">
                    <Link className="forlink" to={"/all/"+album.band_id}><h4>Open discography</h4></Link>
                    
                </div>
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
                            <h3> {album.bandName}</h3>
                            <p> {album.name}</p>
                        </div>
                        </Link>
                        </div>

                    </div>
                )
                )
            }
                </div>
         
                </>
               
                )
                :
                ""
            }
        </div>
    )
}