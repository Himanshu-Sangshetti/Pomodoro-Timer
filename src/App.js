import React, { useState, useEffect } from 'react';
import './App.css';
import Shimeji from './Shimeji'; // Import the Shimeji component
import loaf1b from './images/loafb.png'
import stuntb from './images/stuntb.png'
import wanderb from './images/wanderb.png'
import downb from './images/downb.png'
import loaf2b from './images/loaf2b.png'
import climbb from './images/climbb.png'

const DEFAULT_SESSION_LENGTH = 25; // Default session length in minutes
const IMAGE_LIST = [
  { src: loaf1b, animation: 'bounce' },
  { src: stuntb, animation: 'rotate' },
  { src: wanderb, animation: 'bounce' },
  { src: downb, animation: 'rotate' },
  { src: loaf2b, animation: 'bounce' },
  { src: climbb, animation: 'bounce' },
];

const App = () => {
  const [sessionLength, setSessionLength] = useState(DEFAULT_SESSION_LENGTH);
  const [timeLeft, setTimeLeft] = useState(DEFAULT_SESSION_LENGTH * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState('https://i.pinimg.com/originals/5e/a8/ca/5ea8cac804bb8455fcb94849ed1a65b1.gif'); // Replace 'your-default-background-image.jpg' with your default image path
  const [showImageDropdown, setShowImageDropdown] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Handle when timer reaches 0, you can add a sound or any other action here.
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const handleStartStop = () => {
    setIsRunning((prevState) => !prevState);
  };

  const handleReset = () => {
    setIsRunning(false);
    setSessionLength(DEFAULT_SESSION_LENGTH);
    setTimeLeft(DEFAULT_SESSION_LENGTH * 60);
  };

  const handleSessionLengthChange = (event) => {
    const newSessionLength = parseInt(event.target.value);
    setSessionLength(newSessionLength);
    setTimeLeft(newSessionLength * 60);
  };

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((timeInSeconds % 3600) / 60).toString().padStart(2, '0');
    const seconds = (timeInSeconds % 60).toString().padStart(2, '0');
    return (
      <div className="timer">
        <div>{hours}:{minutes}:{seconds}</div>
        <div className="time-label">HRS : MINS : SECS</div>
      </div>
    );
  };

  const handleImageChangerClick = () => {
    setShowImageDropdown((prevState) => !prevState);
  };

  const handleImageOptionClick = (imagePath) => {
    setBackgroundImage(imagePath);
    setShowImageDropdown(false);
  };

  const progress = (1 - timeLeft / (sessionLength * 60)) * 100; // Calculate progress in percentage

  const [shimejiIndex, setShimejiIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setShimejiIndex((prevIndex) => (prevIndex + 1) % IMAGE_LIST.length);
    }, 15000); // Change Shimeji image every 15 seconds

    return () => clearInterval(interval);
  }, []);
  

  const [isShimejiEnabled, setIsShimejiEnabled] = useState(true);

  const toggleShimeji = () => {
    setIsShimejiEnabled((prev) => !prev);
  };


  return (
    <div className="App" style={{ backgroundImage: `url('${backgroundImage}')` }}>
      <div className="timer-container">{formatTime(timeLeft)}</div>
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="controls">
        <button onClick={handleStartStop}>{isRunning ? 'Stop' : 'Start'}</button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <div className="session-length">
        <label>Session Length (minutes):</label>
        <input
          type="number"
          min="1"
          max="60"
          value={sessionLength}
          onChange={handleSessionLengthChange}
        />
      </div>
      <button className="image-changer-button" onClick={handleImageChangerClick}>
        Change Background
      </button>
      {showImageDropdown && (
        <div className="image-dropdown show">
          <div className="image-option" onClick={() => handleImageOptionClick('https://i.pinimg.com/originals/1d/ea/8d/1dea8d0f2dab4a24e262fae44d66c3fb.gif')}>
            <img src="https://i.pinimg.com/originals/1d/ea/8d/1dea8d0f2dab4a24e262fae44d66c3fb.gif" alt="Background 1" />
            Rain
          </div>
          <div className="image-option" onClick={() => handleImageOptionClick('https://media.tenor.com/retY1QkA8_wAAAAC/cozy.gif')}>
            <img src="https://media.tenor.com/retY1QkA8_wAAAAC/cozy.gif" alt="Background 2" />
            Cozy room
          </div>
          <div className="image-option" onClick={() => handleImageOptionClick('https://i.gifer.com/5m5h.gif')}>
            <img src="https://i.gifer.com/5m5h.gif" alt="Background 3" />
            Cyber chills
          </div>
          <div className="image-option" onClick={() => handleImageOptionClick('https://i.pinimg.com/originals/4f/83/ec/4f83ec563dbcfe623cbbeb77305d954e.gif')}>
            <img src="https://i.pinimg.com/originals/4f/83/ec/4f83ec563dbcfe623cbbeb77305d954e.gif" alt="Background 4" />
            Pixel pastel 
          </div>
          <div className="image-option" onClick={() => handleImageOptionClick('https://i.pinimg.com/originals/5e/a8/ca/5ea8cac804bb8455fcb94849ed1a65b1.gif')}>
            <img src="https://i.pinimg.com/originals/5e/a8/ca/5ea8cac804bb8455fcb94849ed1a65b1.gif" alt="Background 5" />
            Clouds
          </div>
        </div>
      )}

      {/* Toggle Shimeji button */}
      <button className={`shimeji-toggle ${isShimejiEnabled ? 'enabled' : ''}`} onClick={toggleShimeji}></button>

      {/* Add the Shimeji component here */}
      {isShimejiEnabled && <Shimeji imageUrl={IMAGE_LIST[shimejiIndex].src} animationType={IMAGE_LIST[shimejiIndex].animation} />}
    </div>
  );
};

export default App;


// import React, { useState, useEffect } from 'react';
// import './App.css';




// const DEFAULT_SESSION_LENGTH = 25; // Default session length in minutes

// const App = () => {
//   const [sessionLength, setSessionLength] = useState(DEFAULT_SESSION_LENGTH);
//   const [timeLeft, setTimeLeft] = useState(DEFAULT_SESSION_LENGTH * 60);
//   const [isRunning, setIsRunning] = useState(false);
//   const [backgroundImage, setBackgroundImage] = useState('https://i.gifer.com/5m5h.gif'); // Replace 'your-default-background-image.jpg' with your default image path
//   const [showImageDropdown, setShowImageDropdown] = useState(false);

//   useEffect(() => {
//     let timer;
//     if (isRunning && timeLeft > 0) {
//       timer = setInterval(() => {
//         setTimeLeft((prevTime) => prevTime - 1);
//       }, 1000);
//     } else if (timeLeft === 0) {
//       // Handle when timer reaches 0, you can add a sound or any other action here.
//     }

//     return () => clearInterval(timer);
//   }, [isRunning, timeLeft]);

//   const handleStartStop = () => {
//     setIsRunning((prevState) => !prevState);
//   };

//   const handleReset = () => {
//     setIsRunning(false);
//     setSessionLength(DEFAULT_SESSION_LENGTH);
//     setTimeLeft(DEFAULT_SESSION_LENGTH * 60);
//   };

//   const handleSessionLengthChange = (event) => {
//     const newSessionLength = parseInt(event.target.value);
//     setSessionLength(newSessionLength);
//     setTimeLeft(newSessionLength * 60);
//   };

//   const formatTime = (timeInSeconds) => {
//     const hours = Math.floor(timeInSeconds / 3600).toString().padStart(2, '0');
//     const minutes = Math.floor((timeInSeconds % 3600) / 60).toString().padStart(2, '0');
//     const seconds = (timeInSeconds % 60).toString().padStart(2, '0');
//     return (
//       <div className="timer">
//         <div>{hours}:{minutes}:{seconds}</div>
//         <div className="time-label">HRS : MINS : SECS</div>
//       </div>
//     );
//   };

//   const handleImageChangerClick = () => {
//     setShowImageDropdown((prevState) => !prevState);
//   };

//   const handleImageOptionClick = (imagePath) => {
//     setBackgroundImage(imagePath);
//     setShowImageDropdown(false);
//   };

//   const soundtrackOptions = [
//     {
//       name: 'Soundtrack 1',
//       url: '/r.mp3', // Replace with the actual URL or path
//     },
//     {
//       name: 'Soundtrack 2',
//       url: 'https://example.com/soundtrack2.mp3', // Replace with the actual URL or path
//     },
//     // Add more soundtrack options as needed
//   ];

//   const [selectedSoundtrack, setSelectedSoundtrack] = useState(null);

//   useEffect(() => {
//     // Load the default soundtrack when the component mounts
//     setSelectedSoundtrack(soundtrackOptions[0]?.url);
//   }, []);

//   const handleSoundtrackOptionClick = (soundtrackUrl) => {
//     setSelectedSoundtrack(soundtrackUrl);
//   };

//   const handleNextSoundtrack = () => {
//     const currentIndex = soundtrackOptions.findIndex(
//       (soundtrack) => soundtrack.url === selectedSoundtrack
//     );
//     const nextIndex = (currentIndex + 1) % soundtrackOptions.length;
//     setSelectedSoundtrack(soundtrackOptions[nextIndex]?.url);
//   };

//   const handlePreviousSoundtrack = () => {
//     const currentIndex = soundtrackOptions.findIndex(
//       (soundtrack) => soundtrack.url === selectedSoundtrack
//     );
//     const previousIndex = (currentIndex - 1 + soundtrackOptions.length) % soundtrackOptions.length;
//     setSelectedSoundtrack(soundtrackOptions[previousIndex]?.url);
//   };

//   const [isPlaying, setIsPlaying] = useState(false);

//   const handlePlayPause = () => {
//     setIsPlaying((prevState) => !prevState);
//   };

//   return (
//     <div className="App" style={{ backgroundImage: `url('${backgroundImage}')` }}>
//       <div className="timer-container">{formatTime(timeLeft)}</div>
//       <div className="controls">
//         <button onClick={handleStartStop}>{isRunning ? 'Stop' : 'Start'}</button>
//         <button onClick={handleReset}>Reset</button>
//       </div>
//       <div className="session-length">
//         <label>Session Length (minutes):</label>
//         <input
//           type="number"
//           min="1"
//           max="60"
//           value={sessionLength}
//           onChange={handleSessionLengthChange}
//         />
//       </div>
//       <button className="image-changer-button" onClick={handleImageChangerClick}>
//         Change Image
//       </button>
//       {showImageDropdown && (
//         <div className="image-dropdown show">
//           <div className="image-option" onClick={() => handleImageOptionClick('https://i.pinimg.com/originals/1d/ea/8d/1dea8d0f2dab4a24e262fae44d66c3fb.gif')}>
//             Image 1
//           </div>
//           <div className="image-option" onClick={() => handleImageOptionClick('https://media.tenor.com/retY1QkA8_wAAAAC/cozy.gif')}>
//             Image 2
//           </div>
//           <div className="image-option" onClick={() => handleImageOptionClick('https://i.gifer.com/5m5h.gif')}>
//             Image 3
//           </div>
//           <div className="image-option" onClick={() => handleImageOptionClick('https://i.pinimg.com/originals/4f/83/ec/4f83ec563dbcfe623cbbeb77305d954e.gif')}>
//             Image 4
//           </div>
//           <div className="image-option" onClick={() => handleImageOptionClick('https://i.pinimg.com/originals/5e/a8/ca/5ea8cac804bb8455fcb94849ed1a65b1.gif')}>
//             Image 5
//           </div>
//         </div>
//       )}
//       <div className="music-player">
//         <h3>Music Soundtracks</h3>
//         {soundtrackOptions.map((soundtrack, index) => (
//           <div
//             key={index}
//             className={`soundtrack-option ${selectedSoundtrack === soundtrack.url ? 'active' : ''}`}
//             onClick={() => handleSoundtrackOptionClick(soundtrack.url)}
//           >
//             {soundtrack.name}
//           </div>
//         ))}
//         <div className="music-controls">
//           <button onClick={handlePreviousSoundtrack}>◀</button>
//           <button onClick={handlePlayPause}>{isPlaying ? '▮▮' : '▶'}</button>
//           <button onClick={handleNextSoundtrack}>▶</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;
