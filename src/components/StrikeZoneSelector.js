import React from "react";

const StrikeZoneSelector = ({ position, setPosition, setZone, setPlateX, setPlateZ }) => {
    const plateWidth = 1.4167; // 17 inches in feet

    const handleHorizontalChange = (e) => {
      setPosition({ ...position, x: parseInt(e.target.value, 10) });
    };
  
    const handleVerticalChange = (e) => {
      setPosition({ ...position, y: parseInt(e.target.value, 10) });
    };
  
    const calculateZone = () => {
      const column = Math.floor(position.x / 33.33) + 1;
      const row = 2 - Math.floor(position.y / 33.33);
      const zone = row * 3 + column;
      setZone(zone);
  
      // Calculate plateX and plateZ
      // Translate the slider value to a range from -0.5*plateWidth to +0.5*plateWidth
      const plateXValue = ((position.x / 100) - 0.5) * plateWidth * -1; // Flipping plateX
      const plateZValue = ((position.y / 100) - 0.5) * plateWidth; // Assuming the same width for height
      
      setPlateX(plateXValue);
      setPlateZ(plateZValue);
  
      return zone;
    };

  const getDotPosition = () => {
    return {
      left: `${position.x}%`,
      bottom: `${position.y}%`,
    };
  };

  return (
    <div style={{position: "absolute", marginLeft: "25%", marginTop: "75px"}}>
      <div>
        <label>
          Strike Zone Position (Zone: {calculateZone()})
        </label>
        <div
          style={{
            position: "absolute",
            width: "150px",
            height: "180px",
            border: "1px solid black",
            marginLeft: "20px",
            marginTop: "60px"
          }}
        >
          {/* Draw lines to divide strike zone into ninths */}
          <div
            style={{
              position: "absolute",
              top: "33.33%",
              width: "100%",
              height: "1px",
              backgroundColor: "black",
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              top: "66.66%",
              width: "100%",
              height: "1px",
              backgroundColor: "black",
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              left: "33.33%",
              height: "100%",
              width: "1px",
              backgroundColor: "black",
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              left: "66.66%",
              height: "100%",
              width: "1px",
              backgroundColor: "black",
            }}
          ></div>

          {/* Dot representing the position */}
          <div
            style={{
              position: "absolute",
              ...getDotPosition(),
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              backgroundColor: "red",
              transform: "translate(-50%, 50%)",
            }}
          ></div>
        </div>
        <div style={{ position: "absolute", marginTop: "260px" }}>
          <label htmlFor="horizontal-slider">Horizontal Position</label>
          <input
            id="horizontal-slider"
            type="range"
            min="0"
            max="100"
            value={position.x}
            style={{ width: "200px" }}
            onChange={handleHorizontalChange}
          />
          <div style={{ height: "12px" }}></div>
          <label htmlFor="vertical-slider">Vertical Position</label>

          <input
            id="vertical-slider"
            type="range"
            min="0"
            max="100"
            value={position.y}
            style={{ width: "230px", writingMode: "bt-lr" }}
            onChange={handleVerticalChange}
          />
        </div>
      </div>
    </div>
  );
};

export default StrikeZoneSelector;
