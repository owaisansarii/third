import React, { useState, useEffect } from "react";

const Index = (props) => {
  let title = props.fileName;
  console.log("https://mcq1-api.herokuapp.com/api/" + title);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchApi = async () => {
      const url = `https://mcq1-api.herokuapp.com/api/${title}`;
      const res = await fetch(url);
      const resJson = await res.json();
      setData(resJson);
    };
    fetchApi();
  }, [title]);
  //   console.log(data);
  if (!data) {
    return <div style={{ textAlign: "center" }}>Loading...</div>;
  }
  return (
    <>
      {/* <p>{!data ? "Loading..." : "yes"}</p>
      <p>{title}</p> */}
      {data &&
        data.map((item, index) => {
          let { Question, Options, Answer } = item;
          let code;
          let ques, ans;
          if (Answer) {
            ans = Answer.split("\n")[0];
          }
          if (Question) {
            code = Question.substring(Question.indexOf("<"));
            ques = Question.replace(code, "");
          }
          return (
            <div key={index} className="mcq">
              <div className="question">
                <span>{ques}</span>
                <div dangerouslySetInnerHTML={{ __html: code }}></div>
                <div className="border"></div>
              </div>
              <div className="option-ans">
                {Options.map((option, index) => {
                  return <p key={index}>{option}</p>;
                })}
                <div className="answer">{ans}</div>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default Index;
