import { useState } from 'react';
import '../styles/Room.css'
import Canvas from '../components/Canvas'
import Chat from '../components/Chat'
import Timer from '../components/Timer';
import Word from '../components/Word';

function Room() {

  const [wordReset, setWordReset] = useState(false);

  const handleTimerEnd = ()=>{
    setWordReset(true);
  }

  const handleWordReset = ()=>{
    setWordReset(false);
  }

  return (
    <div className="Room">
      <div className='container'>
        <div className='canvasWrapper'>
          <Canvas width={1000} height={500} />
        </div>
        <div className='chatWrapper'>
          <Chat />
        </div>
        <div className='timerWrapper'>
          <Timer onTimerEnd={handleTimerEnd}/>
        </div>
        <div className='wordWrapper'>
          <Word shouldReset={wordReset} onWordReset={handleWordReset}/>
        </div>
      </div>

    </div>
  );
}

export default Room;
