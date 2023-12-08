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
}) => {
  const sendPredictionRequest = async () => {
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
    // https://pitch-to-contact-lrdedg2qgq-uc.a.run.app
    // For logistic regression
    try {
      const logisticResponse = await fetch(
        "/api/predict-logistic", 
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const logisticResult = await logisticResponse.json();
      console.log(logisticResult);

      setResults(logisticResult);

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
      console.log(results);
      //   setPopupVisible(true);
    } catch (error) {
      console.error("Error making prediction requests:", error);
    }
  };

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
