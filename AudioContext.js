import { createContext, useState } from 'react';

const AudioContext = createContext();

const AudioProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentSong, setCurrentSong] = useState(null); 
   const [arraySong , setArraySong] = useState([])
   function play(){
    
   }
  return (
    <AudioContext.Provider value={{ isPlaying, progress,setArraySong,arraySong, setIsPlaying, setProgress, currentSong, setCurrentSong }}>
      {children}
    </AudioContext.Provider>
  );
};

export { AudioProvider, AudioContext };