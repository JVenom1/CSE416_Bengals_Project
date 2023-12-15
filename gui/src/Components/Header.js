import React from "react";
import { useNavigate } from "react-router-dom";
import BengalsImage from "../Images/Bengals.jpg";

const Header = ({ headerText }) => {
  const navigate = useNavigate();

  const goToHomePage = () => {
    navigate("/");
    window.location.reload();
  };

  const undoPage = () => {
    window.history.back();
  };

  // const redoPage = () => {
  //   window.history.forward();
  // };

  const resetButtonStyle = {
    backgroundImage: `url(${BengalsImage})`,
  };

  return (
    <>
      <div className="header">
        <div className="header-button-list">
          <div
            onClick={goToHomePage}
            style={resetButtonStyle}
            className="reset-button"
          />
          <button onClick={undoPage} className="header-button">
            Undo Page
          </button>
          {/* <button onClick={redoPage} className="header-button">
                        Redo Page
                    </button>*/}
        </div>
        <span className="header-text">{headerText}</span>
      </div>
    </>
  );
};

export default Header;
