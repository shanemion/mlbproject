import React from "react";

const PitchBallButton = ({
  results,
  setResults,
  pitchSpeed,
  spinRate,
  xpos,
  ypos,
  plateX,
  plateZ,
  pfxX,
  pfxZ,
  zone,
  pitchType,
  popupVisible,
  setPopupVisible,
  change,
  setChange,
}) => {
  // const sendPredictionRequest = async () => {
  // const payload = {
  //   pitchSpeed,
  //   spinRate,
  //   xpos,
  //   ypos,
  //   plateX,
  //   plateZ,
  //   pfxX,
  //   pfxZ,
  //   zone,
  //   pitchType,
  // };
  // // For logistic regression
  // try {
  //   const logisticResponse = await fetch(
  //     "/api/predict-logistic",
  //     {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(payload),
  //     }
  //   );
  //   const logisticResult = await logisticResponse.json();
  // console.log(logisticResult);

  // setResults(logisticResult);

  //   // For Naive Bayes
  //   const naiveResponse = await fetch(
  //     "http://localhost:5002/predict-naive-bayes",
  //     {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(payload),
  //     }
  //   );
  //   const naiveResult = await naiveResponse.json();
  //   console.log(naiveResult);

  // Update results state here
  //   setResults({
  //     logistic: logisticResult.result,
  //     naiveBayes: naiveResult.result
  //   });
  // console.log(results);
  //   //   setPopupVisible(true);
  // } catch (error) {
  //   console.error("Error making prediction requests:", error);
  // }
  // };
  const hardcoded_thetas = [
    -0.75882234, 0.02802454, -0.02408761, 0.00108827, -0.02847524, -0.08562155,
    -0.21532068, 0.09516804, -0.13506167, -0.04805247, -0.14796846, 0.31359849,
    0.0538774,
  ];

  const payload = {
    pitchSpeed,
    spinRate,
    xpos,
    ypos,
    plateX,
    plateZ,
    pfxX,
    pfxZ,
    zone,
    pitchType,
  };

  const sigmoid = (z) => 1 / (1 + Math.exp(-z));

  const dot = (a, b) => a.map((x, i) => a[i] * b[i]).reduce((m, n) => m + n);

  const predict = (x, theta) => {
    const probability = sigmoid(dot(x, theta));
    return probability >= 0.5 ? 1 : 0;
  };

  const getFeatures = (payload) => {
    const pitchTypes = ["fastball", "changeup", "curveball", "slider"];
    const features = [
      parseFloat(payload.pitchSpeed),
      parseFloat(payload.spinRate),
      parseFloat(payload.xpos),
      parseFloat(payload.ypos),
      parseFloat(payload.plateX),
      parseFloat(payload.plateZ),
      parseFloat(payload.pfxX),
      parseFloat(payload.pfxZ),
      parseFloat(payload.zone),
      ...pitchTypes.map((type) => (payload.pitchType === type ? 1.0 : 0.0)),
    ];

    return features;
  };

  const sendPredictionRequest = () => {
    const features = getFeatures(payload);
    const predictionResult = predict(features, hardcoded_thetas);
    console.log("predictionResult:", predictionResult);
    setChange(change + 1);
    setResults(predictionResult);
  }

  return (
    <div style={{ position: "absolute", marginLeft: "47%" }}>
      <button
        onClick={sendPredictionRequest}
        style={{
          backgroundColor: "#d32f2f", // Red color, similar to baseball stitching
          color: "white", // White text for contrast
          padding: "10px 20px", // Comfortable padding
          fontSize: "1.2rem", // Slightly larger font size
          fontWeight: "bold", // Bold text
          borderRadius: "5px", // Slight rounding of edges
          border: "none", // Removing default border
          cursor: "pointer", // Cursor changes to pointer on hover
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Subtle shadow for depth
          transition: "background-color 0.3s ease", // Smooth transition for hover effect
          margin: "10px 0", // Margin for spacing
        }}
      >
        Pitch Ball
      </button>
      {results.logistic && (
        <div>Logistic Regression Result: {results.logistic}</div>
      )}
      {results.naiveBayes && (
        <div>Naive Bayes Result: {results.naiveBayes}</div>
      )}
    </div>
  );
};

export default PitchBallButton;
