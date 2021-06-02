import { useState } from "react";
import Result from "./Result";
import "./RunApp.css";
import { Link } from "react-router-dom";

const RunInstaCaptions = () => {
  const OpenAI = require("openai-api");
  const OPENAI_API_KEY = "";

  const openai = new OpenAI(OPENAI_API_KEY);

  const [data, setData] = useState([]);
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");

  let maxTokens = [10, 10, 10];
  let tempList = [0.6, 0.7, 0.8];
  let engine = [
    "davinci-instruct-beta",
    "davinci-instruct-beta",
    "curie-instruct-beta"
  ];

  const stringBuilder = str => {
    var newStr = str.trim().replace(/(\r\n|\n|\r)/gm, "");
    return newStr;
  };

  const handleSubmit = e => {
    e.preventDefault();

    var prompt = "";
    if (description !== "") {
      prompt =
        "please write a instagram caption about " +
        description.trim() +
        "," +
        stringBuilder(description) +
        "." +
        keywords;
    }
    console.log(prompt);

    if (description !== "" || keywords !== "") {
      for (let step = 0; step < 3; step++) {
        (async () => {
          try {
            const gptResponse = await openai.complete({
              engine: engine[step],
              prompt: prompt,
              maxTokens: maxTokens[step],
              temperature: tempList[step],
              topP: 1,
              presencePenalty: 0,
              frequencyPenalty: 0,
              bestOf: 1,
              n: 1,
              stream: false,
              stop: ['""""""']
            });
            console.log(gptResponse.data.choices);
            setData(arr => [
              ...arr,
              stringBuilder(gptResponse.data.choices[0].text)
            ]);
          } catch (err) {
            console.log(err.message);
          }
        })();
      }
    } else {
      console.log("please enter values");
    }
  };

  return (
    <div className="wrapper">
      <div className="box0">
        <div className="tools">
          <Link to="/services" className="h4-class">
            {" "}
            Product Descriptions
          </Link>
          <Link to="/instagramCaptions" className="h4-class">
            {" "}
            Instagram Captions
          </Link>
        </div>
      </div>
      <div className="box1">
        <form onSubmit={handleSubmit}>
          <div className="form-div">
            <h3 className="service-name"> Instagram Captions</h3>

            <div>
              <label>Enter Product Description: </label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label>Keywords: </label>
              <input
                type="text"
                value={keywords}
                onChange={e => setKeywords(e.target.value)}
              ></input>
            </div>
            <button>Click to Generate</button>
          </div>
        </form>
      </div>
      <div className="box2">
        <div className="scroll">
          <div className="results">
            {data.map(item => (
              <Result data={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RunInstaCaptions;
