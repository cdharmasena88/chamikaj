import { useState } from "react";
import Result from "./Result";
import "./RunApp.css";
import { Link } from "react-router-dom";

const RunApp = () => {
  const OpenAI = require("openai-api");
  const OPENAI_API_KEY = "";

  const openai = new OpenAI(OPENAI_API_KEY);

  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [isLoading, setIspending] = useState(false);
  const [isInputEmpty, setIsInputEmpty] = useState(false);

  let maxTokens = [80, 80, 80];
  let tempList = [0.6, 0.7, 0.8];

  const stringBuilder = str => {
    var newStr = str.trim().replace(/(\r\n|\n|\r)/gm, "");
    return newStr;
  };

  const handleSubmit = e => {
    e.preventDefault();
    setIspending(true);
    setData([]);

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

    if (description === "" || keywords === "") {
      setIsInputEmpty(true);
      setIspending(false);
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
            setIspending(false);
            setIsInputEmpty(false);
          } catch (err) {
            console.log(err.message);
            setIspending(false);
          }
        })();
      }
    } else {
      console.log("please enter values");
    }
  };

  return (
    <div>
      <div className="wrapper">
        <div className="box0">
          <div className="tools">
            <Link to="/services" className="h4-class">
              {" "}
              <p>Product Descriptions</p>
            </Link>
            <Link to="/instagramCaptions" className="h4-class">
              {" "}
              <p>Instagram Captions</p>
            </Link>
            <hr class="seperate-tools"></hr>
            <h3 className="tool-group">Write Emails</h3>
            <Link to="/emailSubjectLines" className="h4-class">
              <p>Catchy Email Subject Lines</p>
            </Link>
            <Link to="/followupEmail" className="h4-class">
              <p>Write a Follow Up Email</p>
            </Link>
            <hr class="seperate-tools"></hr>
            <h3 className="tool-group">Blogs</h3>
            <Link to="/bulletPointToParagraph" className="h4-class">
              <p>Bullet point to Paragraph</p>
            </Link>
            <div className="examples">
              <a
                href="https://www.notion.so/Get-Better-Results-437010b249e94bffb36bbac2ce8922af"
                target="_blank"
              >
                Tips for Better Results
              </a>
            </div>
          </div>
        </div>
        <div className="box1">
          <form onSubmit={handleSubmit}>
            <div className="form-div">
              <h3 className="service-name"> Product Description</h3>
              <div>
                <label>Enter Product Name:</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="CopyHero"
                ></input>
              </div>

              <div>
                <label>Enter Product Description: </label>
                <textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="e.g AI powered copywriter that saves you time"
                ></textarea>
              </div>
              <div>
                <label>Keywords: </label>
                <input
                  type="text"
                  value={keywords}
                  onChange={e => setKeywords(e.target.value)}
                  placeholder="e.g marketing, SEO, Website Copy"
                ></input>
              </div>
              {isLoading ? (
                <button disabled>Generating Captions</button>
              ) : (
                <button>Click to Generate</button>
              )}
            </div>
          </form>
        </div>
        <div className="box2">
          {isInputEmpty && (
            <div className="empty-input">Your input in Empty</div>
          )}
          {isLoading && <div className="loading">Loading....</div>}
          <div className="scroll">
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
