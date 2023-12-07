import React from 'react';

const Title = () => {
  const titleStyle = {
    textAlign: 'center',
    fontFamily: "'Arial', sans-serif",
    fontSize: '3em',
    color: '#092c5c', // Dark blue color, often associated with baseball uniforms
    backgroundColor: '#f2f2f2', // Light gray background
    padding: '20px 0',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
    borderBottom: '5px solid #cc0000', // Adding a red border at the bottom
  };

  return (
    <h1 style={titleStyle}>⚾ Pitch To Contact ⚾</h1>
  );
}

export default Title;
