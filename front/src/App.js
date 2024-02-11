import React, { useState, useEffect, useRef } from 'react';
import './App.scss';
import { Routes, Route, BrowserRouter as Router, Navigate } from 'react-router-dom';
import Header from './components/header/code/Header';
import HeaderAuth from './components/headerAuth/code/HeaderAuth';
import Main from './components/main/code/Main';
import Support from './components/support/code/Support';
import List from './components/list/code/List';
import Footer from './components/footer/code/Footer';
import Register from './components/register/code/Register';
import LogIn from './components/logIn/code/LogIn';
import Song from './components/song/code/Song';
import Band from './components/band/code/Band';
import Album from './components/album/code/Album';
import Error from './components/error/code/Error';
import All from './components/all/code/All';
import Player from './components/player/code/Player';
import Profile from './components/profile/code/Profile';
import Search from './components/search/code/Search';
import { UserProvider } from './contexts/UserContext';
import { SongProvider } from './contexts/SongContext';
import maybe from './songs/maybe.mp3';
import tibiohuela from './songs/tibiohuela.mp3'
import srivaiusisust from './songs/srivaiusisust.mp3'
import samiidorogoichelovek from './songs/samiidorogoichelovek.mp3'
import privetlovi from './songs/privetlovi.mp3'
import pokaifuanepomode from './songs/pokaifuanepomode.mp3'
import vyshevseh from './songs/vyshevseh.mp3'
import vesnakapslock from './songs/vesnakapslock.mp3'
import uletayu from './songs/uletayu.mp3'
import iluvu from './songs/iluvu.mp3'

function App() {
  const [imports, setImports] = useState([maybe,tibiohuela,srivaiusisust,samiidorogoichelovek,privetlovi,pokaifuanepomode,iluvu,uletayu,vesnakapslock,vyshevseh])
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState("");
  const [currentTitle,setCurrentTitle] = useState("")
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLink , setCurrentLink] = useState("")
  const audioElem = useRef();

  useEffect(() => {
    if(currentLink) {
      if (isPlaying) audioElem.current.play();
      else audioElem.current.pause();
      
    }
  }, [ isPlaying, currentSong]);

  const onPlaying = () => {
    const duration = audioElem.current.duration;
    const ct = audioElem.current.currentTime;

    setCurrentSong({ ...currentLink, progress: (ct / duration) * 100, length: duration});
  };

  const [userId, setUserId] = useState(null);
  const footerHeight = userId ? 305 : 200;

  const handleSetUserId = (newUserId) => {
    setUserId(newUserId);
  };

  const handleLogout = () => {
    setUserId(null);
  };

  const handleSongSelect = (song) => {
    if(userId)
    {

    
    setSongs(song);
    console.log(song)
    for(let j = 0 ; j < song.length;j++)
    {
      for (let i = 0; i < imports.length; i++) {
        if (imports[i].includes(song[j].link)) {
          song[j] = {...song[j], link:imports[i]}
          if(j == 0 )
          {
            setCurrentLink(imports[i]);
            setCurrentTitle(song[0].name)
          }
            
            break;
        }
    }
    }
    
    setIsPlaying(true);
  }
  };

  return (
    <UserProvider>
      <SongProvider>
        <Router>
          <div className="App">
            {userId ? <HeaderAuth handleLogout={handleLogout} /> : <Header />}

            <Routes>
              <Route path="/" element={<div><Main /></div>} />
              <Route path="/list/albums" element={<List type="albums" />} />
              <Route path="/list/bands" element={<List type="bands" />} />
              <Route path="/support" element={<Support />} />
              <Route path="/login" element={<div><LogIn onLogin={handleSetUserId} /></div>} />
              <Route path="/register" element={<div><Register /></div>} />
              <Route path="/song/:id" element={<Song user={userId} onSongSelect={handleSongSelect} />} />
              <Route path="/band/:id" element={<Band user={userId} onSongSelect={handleSongSelect}  />} />
              <Route path="/album/:id" element={<Album user={userId} onSongSelect={handleSongSelect} />} />
              <Route path="/all/:id" element={<All />} />
              <Route path="/profile" element={userId ? <Profile id={userId} /> : <Navigate to="/" />} />
              <Route path="*" element={<Error />} />
              <Route path="/search/:id" element={<Search />} />

            </Routes>

            <Footer height={footerHeight} />
           
              <audio src={currentLink} ref={audioElem} onTimeUpdate={onPlaying} />
             
            
            {userId ? (
              <Player
                songs={songs}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                audioElem={audioElem}
                currentLink={currentLink}
                setCurrentLink={setCurrentLink}
                currentSong = {currentSong}
                setCurrentSong = {setCurrentSong}
                onPlaying={onPlaying}
                currentTitle = {currentTitle}
                setCurrentTitle={setCurrentTitle}
              />
            ) : null}
            
          </div>
        </Router>
      </SongProvider>
    </UserProvider>
  );
}

export default App;
