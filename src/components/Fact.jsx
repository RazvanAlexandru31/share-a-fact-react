import React from "react";
import supabase from "../Supabase";
import { useState } from "react";

const Fact = ({ item, CATEGORIES, setFactsList, factsList }) => {
  const [btnUpdating, setBtnIsUpdating] = useState(false);

  const handleLikes = async (btnName) => {
    setBtnIsUpdating(true);
    const { data, error } = await supabase
      .from("facts")
      .update({ [btnName]: item[btnName] + 1 })
      .eq("id", item.id)
      .select();
    setBtnIsUpdating(false);

    if (!error) {
      setFactsList(
        factsList.map((el) => {
          return el.id === item.id ? data[0] : el;
        })
      );
    }
  };
  return (
    <li className="fact">
      <p>{item.text}</p>
      <span
        className="tag"
        style={{
          backgroundColor: CATEGORIES.find((el) => el.name === item.category)
            .color,
        }}
      >
        {item.category}
      </span>
      <a className="source" href={item.source} target="_blank" rel="noreferrer">
        (Source)
      </a>
      <div className="vote-btn">
        <button onClick={() => handleLikes("voteLike")} disabled={btnUpdating}>
          Likes {item.voteLike}
        </button>
        <button onClick={() => handleLikes("voteDislike")} disabled={btnUpdating}>
          Dislikes {item.voteDislike}
        </button>
      </div>
    </li>
  );
};

export default Fact;
