import React from "react";
import manImage from "./man.png"; // Import the image

const ArmComponent = ({ releasePoint, pitchSpeed }) => {

  // Function to determine the width of the arm based on pitchSpeed
  const getArmWidth = () => {
    if (pitchSpeed > 85) return "4px";
    if (pitchSpeed > 75) return "2px";
    return "1px";
  };

  return (
    <div style={{ marginLeft: '55%', marginTop: '0px' }}>
      <div
        style={{
          position: "absolute",
          width: "200px",
          height: "200px",
        }}
      >
        <img src={manImage} alt="Man" style={{ width: "250%", height: "280%" }} />

        <div
          style={{
            position: "absolute",
            width: getArmWidth(),
            height: "140px",
            backgroundColor: "black",
            transform: `rotate(${releasePoint}deg)`,
            transformOrigin: "bottom",
            bottom: "-30%",
            left: "110%",
          }}
        >
          {/* Draggable end of the arm */}
          <div
            style={{
              position: "absolute",
              width: "20px",
              height: "20px",
              backgroundColor: "white",
              border: "3px solid black",
              borderRadius: "100%",
              top: "-10px",
              left: "-10px",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ArmComponent;
