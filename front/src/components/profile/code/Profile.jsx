import "../style/profile.scss"
import React , {useState,useEffect} from 'react';
import axios from "axios"
import {Link} from "react-router-dom"
export default function Profile(props) {
    const userId = props.id
    let ord = 0;
const [user, setUser] = useState(null);
const [preferences, setAllPreferences] = useState([]);

const fetchData = async (userId) => {
  try {
      const [userResponse, preferencesResponse] = await Promise.all([
          axios.get(`http://localhost:8000/api/user/${userId}`),
          axios.get(`http://localhost:8000/api/user/pref/song/${userId}` )
      ]);
      if (userResponse) {
          setUser(userResponse.data);
      }

      if (preferencesResponse?.data) {
          setAllPreferences(preferencesResponse.data);
      }
  } catch (error) {
      console.error("Error fetching data:", error);
  }
};

useEffect(() => {
  fetchData(userId);
}, []);

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
  return (
    <div className="user">
      {
        user?
        (
          <>
          


          <div className="info2">
            <div className="info">
            <div className="name">
            <h1>Liked {user.username}</h1>
            </div>
           
            </div>
            </div>
            <div className="topside" >
                    <div className="info2" >
                        <div className="tag">#</div>
                        <div className="name">
                                <span className="forname">Name</span>
                        </div>
                        <div className="name">
                                <span className="forname2">Album Name</span>
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
                    preferences?.map((songg) => (
                    <div key={songg.id}  className="songswithall">
                        <div className="number">
                            <p>{++ord}</p>
                            
                        </div>
                        <div className="photoband">
                          <img src={songg.poster} alt={songg.name} />
                        </div>
                        <div className="songname">
                            <Link className="forlink" to={"/song/"+songg.songId}>
                            <h1>{songg.name}</h1>
                            </Link>
                        </div>
                        <div className="songname">
                            <Link className="forlink" to={"/album/"+songg.albumId}>
                            <h1>{songg.albumName}</h1>
                            </Link>
                        </div>
                        <div className="songduration">
                            <h2>{songg.duration}</h2>
                        </div>
                        </div>
                    ))
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