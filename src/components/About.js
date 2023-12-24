import React, { useState } from "react";

const DescriptionDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const dropdownStyle = {
    backgroundColor: "#f9f9f9",
    borderRadius: "5px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
    padding: "10px 15px",
    margin: "10px 0",
    fontSize: "1em",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const contentStyle = {
    maxHeight: isOpen ? "300px" : "0",
    overflowY: "auto",
    transition: "max-height 0.3s ease",
    padding: isOpen ? "10px 0" : "0",
  };

  const paragraphStyle = {
    fontSize: "1.1em", // Slightly larger font size
    lineHeight: "1.6", // Increased line height for better readability
    margin: "0 0 10px 0", // Margin at the bottom of the paragraph
  };

  return (
    <div style={{ width: "50%", marginLeft: "26%" }}>
      <div style={dropdownStyle} onClick={toggleDropdown}>
        <strong>About This Project</strong>
      </div>
      <div style={contentStyle}>
        {isOpen && (
          <div>
          <div style={{display: "flex", justifyContent: "center", alignItems: "center", padding: "10px"}}>
          *scrollable*                                            
          </div>
          <p style={paragraphStyle}>
            This project is called "Pitch to Contact!" The "lore"
            or situation behind our pitcher and ghost batter is simple. The ghost batter is a very good hitter, 
            and can hit any pitch you throw. Therefore, we need to come up with ways to get this ghost
            batter out, by pitching to contact. We know we can't get him to
            swing and miss, so we must adapt our pitching technique and strategy
            to try and throw pitches so that the defense behind you can make a
            play to get the ghost out. 
          </p>
          <p style={paragraphStyle}>
            This is an interactive project that
            allows you, the pitcher attempting to get the ghost out, to change a
            few choices behind pitching. You can change the arm angle you throw
            from, going from completely overhand to completely sidearm (don't
            worry, you don't need to worry about getting injured!). 
            
          </p>
          <p style={paragraphStyle}>
            Furthermore,
            you somehow have gained the ability to precisely control the spin
            rate of every pitch you throw, which is the revolutions your thrown
            ball will make in one minute. 
            
          </p>
          <p style={paragraphStyle}>
            Of course, we get to choose the speed
            you throw the ball at as well, what type of pitching simulator would
            be complete without that variable. 
            
          </p>
          <p style={paragraphStyle}>
            But the most important thing we
            can control as a pitcher is where our ball ends up; that's right! we
            get to tell our ball exactly where to go, no more pain of missing
            your spots! My little league coach would dream to be able to have
            this trait, and well, so would I. So I did. 
            
          </p>
          <p style={paragraphStyle}>
            Fortunately for us, this
            ghost is not all powerful. This ghost is controlled by a higher
            power, a logistic regression algorithm. We use a machine learning
            algorithm called logistic regression to predict the outcome of each
            pitch, trained on the various parameters that we have described to
            you so far. You can view it more in depth at this github repo: "https://github.com/shanemion/mlbproject/tree/main".
            Best of luck in getting the ghost out; and when you find a pitch
            that works, try and cut them some slack and not just throw the same
            pitch over and over again. I'm sure they'll appreciate it.

            
          </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DescriptionDropdown;
