import { Link } from "react-router-dom"
import "../style/Header.scss"
import Photo from "../../../images/logo-PhotoRoom.png-PhotoRoom.png"
import Photo2 from "../../../images/arrow.png"
import axios from "axios"
import {useState} from "react"

export default function Header(){
    const [searchTerm, setSearchTerm] = useState("");
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
    const handleRandom = async () => {
        const randomValue = Math.floor(Math.random() * 3) + 1;  //1 song 2 band 3 album
        switch (randomValue) {
            case 1:
                const songReq = await axios.get(`http://localhost:8000/api/random/song`);
                window.location.href = `http://localhost:3000/song/${songReq.data.id}`;
                break;
            case 2:
                const bandReq = await axios.get(`http://localhost:8000/api/random/band`);
                window.location.href = `http://localhost:3000/band/${bandReq.data.id}`;
                break;
            case 3:
                const albumReq = await axios.get(`http://localhost:8000/api/random/album`);
                window.location.href = `http://localhost:3000/album/${albumReq.data.id}`;
                break;
        }
      };

      const handleSearch = async () => {
        window.location.href = `http://localhost:3000/search/${searchTerm}`
    }

    return (
        <header className = "header">
            <div className="header2">

            <div className="links">
            <Link to="/">
            <img width="64" height="64" src={Photo} alt="" />
            </Link>
            <nav className="find">
            <Link className="head" to="/list/albums">List</Link>
            <Link className="head" onClick={handleRandom}>Random</Link>
            <Link className="head" to="/support">Support</Link>
            </nav>
            </div>
            <div className="search">
                <div className="searchSpace">
                    <div className="inputBox">
                        <input className="forinput" type="text" placeholder="Find artist" value={searchTerm}
            onChange={handleChange}/>
                    </div>
                    <button className="filterBox" onClick={handleSearch}>
                    <img  width="32" height="32" src={Photo2} alt="" />
                    </button>
                </div>
            </div>
            <div className="profile">
            <Link to="/register">
                <button className="button1">
                Register
                </button>
            </Link>
            <Link to="/login">
                <button className="button2">
                Log in
                </button>
            </Link>
            </div>
            </div>
        </header>
    )
}