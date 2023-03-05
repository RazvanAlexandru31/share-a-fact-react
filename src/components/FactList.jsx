import React from "react";
import Fact from "./Fact";

const FactList = ({ factsList, CATEGORIES, setFactsList }) => {
  return (
    <ul className="fact-list">
      {factsList.map((item) => (
       <Fact item={item} key={item.id} CATEGORIES={CATEGORIES} setFactsList={setFactsList} factsList={factsList}/>
      ))}
    </ul>
  );
};

export default FactList;
