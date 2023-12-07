import React from 'react';

const PitchSpeedSlider = ({ pitchSpeed, setPitchSpeed }) => {
  return (
    <div style={{
      padding: '20px',
      margin: '10px 0',
      marginLeft: '25%',
      backgroundColor: '#fff',
      borderRadius: '10px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      width: '50%',
    }}>
      <label style={{
        display: 'block',
        marginBottom: '10px',
        fontWeight: 'bold',
        color: '#333'
      }}>Pitch Speed: {pitchSpeed} mph</label>
      <input
        type="range"
        min="60"
        max="100"
        value={pitchSpeed}
        onChange={(e) => setPitchSpeed(e.target.value)}
        style={{
          width: '100%',
          cursor: 'pointer',
        }}
      />
    </div>
  );
};

export default PitchSpeedSlider;
