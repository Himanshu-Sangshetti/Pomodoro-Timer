import React, { useState, useEffect, useRef } from 'react';
import './Shimeji.css';

const Shimeji = ({ imageUrl, animationType }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const shimejiRef = useRef(null); // Ref for the shimeji container

  useEffect(() => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const shimejiWidth = 165; // Width of the shimeji container
    const shimejiHeight = 165; // Height of the shimeji container

    // Function to set a new random position for the shimeji near the screen borders
    const setRandomPosition = () => {
      const isHorizontal = Math.random() < 0.5;
      let newX, newY;

      if (isHorizontal) {
        newX = getRandomNumber(20, screenWidth - shimejiWidth - 20);
        newY = Math.random() < 0.5 ? 20 : screenHeight - shimejiHeight - 20;
      } else {
        newX = Math.random() < 0.5 ? 20 : screenWidth - shimejiWidth - 20;
        newY = getRandomNumber(20, screenHeight - shimejiHeight - 20);
      }

      setPosition({ x: newX, y: newY });
    };

    // Function to generate a random number within a range
    const getRandomNumber = (min, max) => Math.random() * (max - min) + min;

    // Move the shimeji to a random position initially
    setRandomPosition();

    // Move the shimeji to a new random position every 30 seconds
    const interval = setInterval(() => {
      setRandomPosition();
    }, 30000); // Change position every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleMouseDown = (event) => {
    // Check if the click/touch occurred inside the shimeji container
    if (shimejiRef.current && shimejiRef.current.contains(event.target)) {
      setIsDragging(true);
      setDragOffset({
        x: event.clientX - position.x,
        y: event.clientY - position.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (event) => {
    if (isDragging) {
      const newX = event.clientX - dragOffset.x;
      const newY = event.clientY - dragOffset.y;

      setPosition({
        x: Math.min(Math.max(newX, 0), window.innerWidth - 165),
        y: Math.min(Math.max(newY, 0), window.innerHeight - 165),
      });
    }
  };

  const handleTouchStart = (event) => {
    event.preventDefault();
    const touch = event.touches[0];
    // Check if the touch started inside the shimeji container
    if (shimejiRef.current && shimejiRef.current.contains(touch.target)) {
      setIsDragging(true);
      setDragOffset({
        x: touch.clientX - position.x,
        y: touch.clientY - position.y,
      });
    }
  };

  const handleTouchMove = (event) => {
    event.preventDefault();
    if (isDragging) {
      const touch = event.touches[0];
      const newX = touch.clientX - dragOffset.x;
      const newY = touch.clientY - dragOffset.y;

      setPosition({
        x: Math.min(Math.max(newX, 0), window.innerWidth - 165),
        y: Math.min(Math.max(newY, 0), window.innerHeight - 165),
      });
    }
  };

  const handleTouchEnd = (event) => {
    setIsDragging(false);
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging]);

  return (
    <div
      ref={shimejiRef}
      className={`shimeji-container ${animationType}`}
      style={{
        left: position.x,
        top: position.y,
        transition: isDragging ? 'none' : 'left 3s, top 3s',
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      <img
        src={imageUrl}
        alt="Shimeji"
      />
    </div>
  );
};

export default Shimeji;
