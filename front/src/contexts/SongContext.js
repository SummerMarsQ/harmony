import React, { createContext, useState, useContext } from 'react';


const SongContext = createContext();


export const SongProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null); 
  const [songs, setSongs] = useState([]); 

  return (
    <SongContext.Provider value={{ currentSong, setCurrentSong, songs, setSongs }}>
      {children}
    </SongContext.Provider>
  );
};


export const useSongContext = () => {
  return useContext(SongContext);
};
