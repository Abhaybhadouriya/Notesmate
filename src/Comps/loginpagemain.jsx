import React from "react";
import Background from "./img/logback.jpg";
import LoginPage from "./LoginPage";


const loginpagemain = () => {

  var sectionStyle = {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    overflow: "hidden",
    backgroundImage: `url(${Background})`,
  };

  return (
    <div style={sectionStyle}>
      <LoginPage />
    </div>
  )
}

export default loginpagemain;
