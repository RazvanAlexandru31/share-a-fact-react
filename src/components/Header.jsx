import React from "react";

const Header = ({ toggleForm, showForm }) => {
  const handleFormDisplay = () => {
    toggleForm();
  };

  return (
    <header className="header">
      <div className="logo">
        <img src="./logo.png" alt="logo" width="68" height="68" />
        <h1>Share a Fact</h1>
      </div>
      <button className="btn btn-large btn-open" onClick={handleFormDisplay}>
        {showForm ? "Close" : "Share A Fact"}
      </button>
    </header>
  );
};

export default Header;
