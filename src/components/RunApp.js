import { useState } from "react";
import Result from "./Result";
import dotenv from "dotenv";
import "./RunApp.css";

const RunApp = () => {
  const OpenAI = require("openai-api");
  const OPENAI_API_KEY = "";

  const openai = new OpenAI(OPENAI_API_KEY);

  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");

  let maxTokens = [5, 5, 5];
  let tempList = [0.6, 0.7, 0.8];

  const stringBuilder = str => {
    var newStr = str.trim().replace(/(\r\n|\n|\r)/gm, "");
    return newStr;
  };

  const handleSubmit = e => {
    e.preventDefault();

    var prompt = "";
    if (name !== "") {
      prompt =
        "please write a product description about " +
        name.trim() +
        "," +
        stringBuilder(description) +
        "." +
        keywords;
    } else {
      prompt =
        "please write a product description about " +
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
              engine: "davinci-instruct-beta",
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
          <h4> Product Descriptions</h4>
        </div>
      </div>
      <div className="box1">
        <form onSubmit={handleSubmit}>
          <div className="form-div">
            <div>
              <label>Enter Product Name:</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
              ></input>
            </div>

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

export default RunApp;
