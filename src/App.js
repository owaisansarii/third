import React, { useState, useEffect } from "react";
import "./App.css";
const links = require("./saved/contents.json");

const App = () => {
  const [mid, setmid] = useState([]);
  const [title, settitle] = useState([]);
  const [loading, setLoading] = useState(true);

  const getLinks = () => {
    settitle(links);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const Titles = () => {
    const list = mid.map((curElem, i) => {
      curElem = curElem.replace("1000", "");
      curElem = curElem.replace("-questions-answers", "").trim();
      curElem = curElem.replace(/-/g, " ");
      curElem = curElem.trim();
      curElem = curElem.replace("/", "");
      return <p key={i}>{curElem}</p>;
    });
    return <>{list}</>;
  };

  useEffect(() => {
    getLinks();
  }, []);

  const ListItem = (props) => {
    const title = props.det;
    const listitem = title.map((curElem) => {
      const { id, Title, content } = curElem; //destructuring
      return (
        <li
          key={id}
          style={{ fontWeight: "bold", letterSpacing: "2px" }}
          onClick={() => setmid(content)}
        >
          {Title}
        </li>
      );
    });
    return <>{listitem}</>;
  };

  if (loading) {
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  }
  return (
    <>
      <h1>Select MCQ Type</h1>
      <div className="container">
        <ListItem det={title} />
        <Titles />
      </div>
    </>
  );
};

export default App;
