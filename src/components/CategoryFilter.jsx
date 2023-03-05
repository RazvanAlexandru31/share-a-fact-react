import React from "react";

const CategoryFilter = ({ CATEGORIES, setCurrentCat }) => {
  return (
    <aside>
      <ul>
        <li className="category">
          <button className="btn btn-all-categories" onClick={() => setCurrentCat("all")}>All</button>
        </li>
        {CATEGORIES.map((item) => (
          <li key={item.name} className="category">
            <button
            onClick={() => setCurrentCat(item.name)}
              className="btn btn-category"
              style={{ backgroundColor: item.color }}
            >
              {item.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default CategoryFilter;
