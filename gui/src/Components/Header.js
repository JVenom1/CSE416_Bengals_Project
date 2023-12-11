import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Header = ({ headerText }) => {
  const navigate = useNavigate();

  const goToHomePage = () => {
    navigate("/");
  };

  const undoPage = () => {
    window.history.back();
  };

  const redoPage = () => {
    window.history.forward();
  };

  return (
    <>
      <div className="header">
        <div className="header-button-list">
          <button onClick={goToHomePage} className="header-button">
            Reset
          </button>
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
