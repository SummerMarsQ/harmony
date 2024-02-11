import React, { useRef } from 'react';
import '../style/player.scss';
import {BsFillPlayCircleFill, BsFillPauseCircleFill, BsFillSkipStartCircleFill, BsSkipEndCircleFill, BsFillSkipEndCircleFill} from 'react-icons/bs';

export default function Player({audioElem, isPlaying, setIsPlaying, currentLink, setCurrentLink, songs,currentSong,setCurrentSong,currentTitle,setCurrentTitle }){
  
  
  const clickRef = useRef();

  const PlayPause = ()=>
  {
    setIsPlaying(!isPlaying);

  }
 

  const checkWidth = (e)=>
  {
    let width = clickRef.current.clientWidth;
    const offset = e.nativeEvent.offsetX;

    const divprogress = offset / width * 100;
    audioElem.current.currentTime = divprogress / 100 * currentSong.length;

  }

  const skipBack = ()=>
  {if(songs.length !== 1){
    const index = songs.findIndex(x=>x.name === currentTitle);
    if (index === 0)
    {
      setCurrentLink(songs[songs.length - 1].link)
      setCurrentTitle(songs[songs.length-1].name)
    }
    else
    {
      setCurrentLink(songs[index - 1].link)
      setCurrentTitle(songs[index-1].name)
    }
  }
    audioElem.current.currentTime = 0;
    
  }


  const skiptoNext = ()=>
  {if(songs.length !== 1){
    
    const index = songs.findIndex(x=>x.name === currentTitle);
    if (index === songs.length-1)
    {
      setCurrentLink(songs[0].link)
      setCurrentTitle(songs[0].name)
    }
    else
    {
      setCurrentLink(songs[index + 1].link)
      setCurrentTitle(songs[index + 1].name)
    }
  }
    audioElem.current.currentTime = 0;
    
  }

  function convertToTime(floatNumber) {
    const roundedNumber = Math.ceil(floatNumber);

    const minutes = Math.floor(roundedNumber / 60);
    const seconds = roundedNumber % 60;

    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;

    return `${formattedMinutes}:${formattedSeconds}`;
}
    
  
  return (
    
<div className='player_container'>
  <div className="info">
    <div className="s1">
      { audioElem.current.currentTime ? 
    <p>{convertToTime(audioElem.current.currentTime)}</p>:
    ""
  }
    </div>
    
  
      <div className="title">
        <p>{currentTitle}</p>
      </div>
      <div className="s2">
      { currentSong.length ? 
      <p>{convertToTime(currentSong.length)}</p>:
      ""
      }
      </div>
      
      </div>
      <div className="navigation">
        <div className="navigation_wrapper" onClick={checkWidth} ref={clickRef}>
          <div className="seek_bar" style={{width: `${currentSong.progress+"%"}`}}></div>
        </div>
      </div>
      
      <div className="controls">
        <BsFillSkipStartCircleFill className='btn_action' onClick={skipBack}/>
        {isPlaying ? <BsFillPauseCircleFill className='btn_action pp' onClick={PlayPause}/> : <BsFillPlayCircleFill className='btn_action pp' onClick={PlayPause}/>}
        <BsFillSkipEndCircleFill className='btn_action' onClick={skiptoNext}/>        
      </div>
    </div>


  )
}