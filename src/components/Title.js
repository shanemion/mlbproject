import React from 'react';

const Title = () => {
  const titleStyle = {
    marginTop: '0',
    textAlign: 'center',
    fontFamily: "'Helvetica Neue', sans-serif", // A more modern font
    fontSize: '2em', // Slightly larger for boldness
    fontWeight: '400', // Bold font weight
    color: '#333', // A darker shade for contrast
    background: 'linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), linear-gradient(to right, #0b2f5c, #fff, #cc0000)', // Navy, Red, White
    padding: '40px 0', // More vertical padding for emphasis
    borderRadius: '5px', // Smaller radius for subtlety
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)', // Softer shadow
    marginBottom: '30px',
    borderBottom: '4px solid #007bff', // Use a modern accent color
    transition: 'transform 0.3s ease', // Smooth transition for interaction
  };

  const handleMouseOver = () => {
    document.querySelector('h1').style.transform = 'scale(1.05)';
  };

  const handleMouseOut = () => {
    document.querySelector('h1').style.transform = 'scale(1)';
  };

  return (
    <h1 style={titleStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      ~ pitch to contact ~
    </h1>
  );
}

export default Title;
