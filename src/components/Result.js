import React, { useState, useEffect } from 'react';

const ResultPopup = ({ result }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (result !== null) {
      setIsVisible(true);
      console.log(result)
      console.log(result.prediction)
      console.log(`Result is ${result.prediction}: ${result.prediction === 1 ? 'Hit' : 'Out'}`);
      setTimeout(() => {
        setIsVisible(false); // Hide the popup after 2 seconds
      }, 2000);
    }
  }, [result]);

  if (!isVisible) return null;

  return (
    <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#fff', // white background, reminiscent of a baseball
        color: '#0b3954', // navy blue text, often used in baseball team colors
        padding: '50px 40px', // increased padding for a taller and wider appearance
        borderRadius: '20px', // larger border-radius for a softer look
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)', // deeper shadow for depth
        fontSize: '1.5rem', // larger font size for readability
        fontWeight: 'bold', // bold font weight for emphasis
        textAlign: 'center', // center text alignment
        zIndex: 1000,
        transition: 'opacity 0.5s ease-in-out', // smooth transition for opacity
        opacity: isVisible ? 1 : 0,
        maxWidth: '450px', // max width to control the size on larger screens
        width: '85%', // width relative to the screen size
        border: '3px solid #d32f2f', // red border for a classic baseball stitching color
        lineHeight: '1.6', // line height for better text readability
      }}>
      {result.prediction === 1 ? 'You gave up a hit :(' : 'YOU GOT THEM OUT!!!!'}
    </div>
  );
};

export default ResultPopup;
