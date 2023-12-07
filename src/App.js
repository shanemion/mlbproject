import React, { useState, useEffect } from "react";
import PitchSpeedSlider from "./components/PitchSpeedSlider";
import SpinRateSlider from "./components/SpinRateSlider";
import StrikeZoneSelector from "./components/StrikeZoneSelector";
import ReleasePointSelector from "./components/ReleasePointSelector";
import PitchTypeSelector from "./components/PitchTypeSelector";
import ArmComponent from "./components/ArmComponent";
import PitchBallButton from "./components/PitchBallButton";
import ResultPopup from "./components/Result";
import Title from "./components/Title";
import About from "./components/About";

function App() {
  const [pitchSpeed, setPitchSpeed] = useState(80); // Default 80 mph
  const [spinRate, setSpinRate] = useState(2000); // Default 2000 rpm
  const [strikeZonePosition, setStrikeZonePosition] = useState({ x: 45, y: 45 }); // Default position
  const [releasePoint, setReleasePoint] = useState(45); // Default angle in degrees
  const [pitchType, setPitchType] = useState("fastball");
  const [zone, setZone] = useState(7);
  const [xpos, setXpos] = useState(0);
  const [ypos, setYpos] = useState(0);
  const [plateX, setPlateX] = useState(0);
  const [plateZ, setPlateZ] = useState(0);
  const [pfxX, setPfxX] = useState(0);
  const [pfxZ, setPfxZ] = useState(0);
  // const [results, setResults] = useState({ logistic: null, naiveBayes: null });
  const [results, setResults] = useState(1);
  const [popupVisible, setPopupVisible] = useState(false);

  const handleReleasePointUpdate = () => {
    // Assuming xpos, ypos, plateX, and plateZ are already set correctly
    const newPfxX = plateX - xpos;
    const newPfxZ = plateZ - ypos;

    setPfxX(newPfxX);
    setPfxZ(newPfxZ);
  };

  // Call this function whenever xpos, ypos, plateX, or plateZ are updated.
  useEffect(() => {
    handleReleasePointUpdate();
  }, [xpos, ypos, plateX, plateZ]);

  return (
    <div className="App">
      <Title />
      <About />
      <div style={{}}>
        <ReleasePointSelector
          angle={releasePoint}
          setAngle={setReleasePoint}
          setXpos={setXpos}
          setYpos={setYpos}
        />

        <PitchSpeedSlider
          pitchSpeed={pitchSpeed}
          setPitchSpeed={setPitchSpeed}
        />
        <SpinRateSlider spinRate={spinRate} setSpinRate={setSpinRate} />
      </div>
      <PitchTypeSelector pitchType={pitchType} setPitchType={setPitchType} />
      <PitchBallButton
        results={results}
        setResults={setResults}
        pitchSpeed={pitchSpeed}
        spinRate={spinRate}
        xpos={xpos}
        ypos={ypos}
        plateX={plateX}
        plateZ={plateZ}
        pfxX={pfxX}
        pfxZ={pfxZ}
        zone={zone}
        pitchType={pitchType}
        popupVisible={popupVisible}
        setPopupVisible={setPopupVisible}
      />
      <StrikeZoneSelector
        position={strikeZonePosition}
        setPosition={setStrikeZonePosition}
        setZone={setZone}
        setPlateX={setPlateX}
        setPlateZ={setPlateZ}
      />
      <ArmComponent
        releasePoint={releasePoint}
        setReleasePoint={setReleasePoint}
        pitchSpeed={pitchSpeed}
      />
      {/* <ResultPopup result={results.logistic} isVisible={popupVisible} closePopup={() => setPopupVisible(false)} /> */}
      <ResultPopup result={results} />
    </div>
  );
}

export default App;
