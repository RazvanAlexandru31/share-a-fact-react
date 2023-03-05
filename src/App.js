import "./style.css";
import { useState, useEffect } from "react";
import CategoryFilter from "./components/CategoryFilter";
import NewFactForm from "./components/NewFactForm";
import FactList from "./components/FactList";
import Header from "./components/Header";
import supabase from "./Supabase";
import { GridLoader } from "react-spinners";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [factsList, setFactsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCat, setCurrentCat] = useState("all");

  const CATEGORIES = [
    { name: "technology", color: "#3b82f6" },
    { name: "science", color: "#16a34a" },
    { name: "finance", color: "#ef4444" },
    { name: "society", color: "#eab308" },
    { name: "entertainment", color: "#db2777" },
    { name: "health", color: "#14b8a6" },
    { name: "history", color: "#f97316" },
    { name: "news", color: "#8b5cf6" },
  ];

  const getDataFromSupabase = async () => {
    setIsLoading(true);
    let query = supabase.from("facts").select("*");

    if (currentCat !== "all") query = query.eq("category", currentCat);

    const { data: facts, error } = await query
      .order("voteLike", { ascending: false })
      .limit(100);

    if (!error) {
      setFactsList(facts);
    } else {
      console.error(error.message);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    getDataFromSupabase();
    /* eslint-disable */
  }, [currentCat]);

  const toggleForm = () => {
    setShowForm((prevState) => {
      return !prevState;
    });
  };

  const getFormObj = (fact) => {
    // console.log(fact);
    setFactsList((prevState) => {
      return [fact[0], ...prevState];
    });
  };

  return (
    <div className="container">
      <Header toggleForm={toggleForm} showForm={showForm} />
      {showForm && (
        <NewFactForm
          CATEGORIES={CATEGORIES}
          getFormObj={getFormObj}
          setShowForm={setShowForm}
        />
      )}
      <main className="main">
        <CategoryFilter CATEGORIES={CATEGORIES} setCurrentCat={setCurrentCat} />
        {isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <GridLoader color="#28b980" size={20} />
          </div>
        ) : (
          <FactList factsList={factsList} CATEGORIES={CATEGORIES} setFactsList={setFactsList} />
        )}
      </main>
    </div>
  );
}

export default App;
