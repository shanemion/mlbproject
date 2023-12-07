import React from 'react';

const ReleasePointSelector = ({ angle, setAngle, setXpos, setYpos }) => {
  const armLength = 2.5; // Average arm length in feet for a 6'1" male

  const handleAngleChange = (e) => {
    const newAngle = e.target.value;
    setAngle(newAngle);

    // Convert angle from degrees to radians
    const radians = newAngle * (Math.PI / 180);

    // Calculate x and y positions
    const x_pos = Math.cos(radians) * armLength * -1; // Multiply by -1 to flip the x component
    const y_pos = Math.sin(radians) * armLength;

    // Update the x and y positions
    setXpos(x_pos);
    setYpos(y_pos);
  };

  return (
    <div style={{
      padding: '10px',
      margin: '10px 0',
        marginLeft: '25%',
        width: '50%',
      backgroundColor: '#fff',
      borderRadius: '10px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    }}>
      <label style={{
        display: 'block',
        marginBottom: '10px',
        fontWeight: 'bold',
        color: '#333'
      }}>Release Point Angle: {angle}°</label>
      <input
        type="range"
        min="0"
        max="90"
        value={angle}
        onChange={handleAngleChange}
        style={{
          width: '100%',
          cursor: 'pointer',
          backgroundColor: '#4CAF50', // Green color for the slider
        }}
      />
    </div>
  );
};

export default ReleasePointSelector;
