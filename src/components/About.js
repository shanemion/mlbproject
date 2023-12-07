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
  };

  const contentStyle = {
    maxHeight: isOpen ? "200px" : "0",
    overflowY: "auto",
    transition: "max-height 0.3s ease",
    padding: isOpen ? "10px 0" : "0",
  };

  return (
    <div style={{ width: "50%", marginLeft: "26%" }}>
      <div style={dropdownStyle} onClick={toggleDropdown}>
        <strong>About This Project</strong>
      </div>
      <div style={contentStyle}>
        {isOpen && (
          <p>
            *scrollable* This project is called "Pitch to Contact!" The "lore"
            or situation behind our pitcher and ghost batter is simple. The
            ghost batter swings every time, and manages to hit the ball every
            time. Therefore, we need to come up with ways to get this ghost
            batter out, by pitching to contact. We know we can't get him to
            swing and miss, so we must adapt our pitching technique and strategy
            to try and throw pitches so that the defense behind me can make a
            play to get the ghost out. This is an interactive project that
            allows you, the pitcher attempting to get the ghost out, to change a
            few choices behind pitching. You can change the arm angle you throw
            from, going from completely overhand to completely sidearm (don't
            worry, you don't need to worry about getting injured!). Furthermore,
            you somehow have gained the ability to precisely control the spin
            rate of every pitch you throw, which is the revolutions your thrown
            ball will make in one minute. Of course, we get to choose the speed
            you throw the ball at as well, what type of pitching simulator would
            be complete without that variable. But the most important thing we
            can control as a pitcher is where our ball ends up; that's right! we
            get to tell our ball exactly where to go, no more pain of missing
            your spots! My little league coach would dream to be able to have
            this trait, and well, so would I. So I did. Fortunately for us, this
            ghost is not all powerful. This ghost is controlled by a higher
            power, a logistic regression algorithm. We use a machine learning
            algorithm called logistic regression to predict the outcome of each
            pitch, trained on the various parameters that we have described to
            you so far. You can view it more in depth at this github repo: "https://github.com/shanemion/mlbproject/tree/main".
            Best of luck in getting the ghost out; and when you find a pitch
            that works, try and cut them some slack and not just throw the same
            pitch over and over ;{" "}
          </p>
        )}
      </div>
    </div>
  );
};

export default DescriptionDropdown;
