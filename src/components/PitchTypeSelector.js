import React from 'react';

const PitchTypeSelector = ({ pitchType, setPitchType }) => {
  return (
    <div style={{
      padding: '10px',
      margin: '10px 0',
        marginLeft: '34%',
        width: '30%',
      backgroundColor: '#fff',
      borderRadius: '10px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <label htmlFor="pitch-type-selector" style={{
        marginBottom: '5px',
        fontWeight: 'bold',
        color: '#333'
      }}>Select Pitch Type:</label>
      <select
        id="pitch-type-selector"
        value={pitchType}
        onChange={(e) => setPitchType(e.target.value)}
        style={{
          padding: '8px',
          borderRadius: '5px',
          borderColor: '#ddd',
          cursor: 'pointer',
          backgroundColor: '#f9f9f9'
        }}
      >
        <option value="fastball">Fastball</option>
        <option value="changeup">Changeup</option>
        <option value="curveball">Curveball</option>
        <option value="slider">Slider</option>
      </select>
    </div>
  );
};

export default PitchTypeSelector;
