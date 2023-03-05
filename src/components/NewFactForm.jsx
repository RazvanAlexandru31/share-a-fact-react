import React from "react";
import { useState } from "react";
import supabase from "../Supabase";

// https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
const isValidHttpUrl = (string) => {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
};

const NewFactForm = ({ CATEGORIES, getFormObj, setShowForm }) => {
  const [fact, setFact] = useState("");
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  // it depends on the fact state so it will change automatically
  const factLength = fact.length;

  const handleFact = (e) => {
    setFact(e.target.value);
  };

  const handleSource = (e) => {
    setSource(e.target.value);
  };

  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(fact, source, category)
    if (fact && isValidHttpUrl(source) && category && fact.length <= 200) {
      // const newFact = {
      //   id: Math.floor(Math.random() * 999999),
      //   text: fact,
      //   source,
      //   category,
      //   votesLike: 0,
      //   votesDislike: 0,
      // };
      setIsUploading(true);
      const { data: newFact, error } = await supabase
        .from("facts")
        .insert([{ text: fact, source, category }])
        .select();
      setIsUploading(false);
      if (!error) {
        getFormObj(newFact);
      }

      resetInputs();
      setShowForm(false);
    }
  };

  const resetInputs = () => {
    setFact("");
    setSource("");
    setCategory("");
  };

  return (
    <form className="fact-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Share a fact..."
        value={fact}
        onChange={handleFact}
      />
      <span>{200 - factLength}</span>
      <input
        type="text"
        placeholder="Fact source..."
        value={source}
        onChange={handleSource}
      />
      <select value={category} onChange={handleCategory}>
        <option value="">Choose category</option>
        {CATEGORIES.map((item) => (
          <option key={item.name} value={item.name}>
            {item.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button className="btn btn-large" disabled={isUploading}>
        Post
      </button>
    </form>
  );
};

export default NewFactForm;
