import { useState } from "react";
import Result from "./Result";
import "./RunApp.css";
import { Link } from "react-router-dom";

const BulletToPara = () => {
  const OpenAI = require("openai-api");
  const OPENAI_API_KEY = "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";

  const openai = new OpenAI(OPENAI_API_KEY);

  const [data, setData] = useState([]);
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [isPending, setIspending] = useState(false);
  const [isInputEmpty, setIsInputEmpty] = useState(false);

  const stringBuilder = str => {
    var newStr = str.trim().replace(/(\r\n|\n|\r)/gm, "");
    return newStr;
  };

  const handleSubmit = e => {
    e.preventDefault();
    setIspending(true);
    setData([]);

    var prompt = "";
    if (description !== "") {
      prompt =
        "please write a blog about " +
        keywords +
        ", " +
        stringBuilder(description) +
        ".";
    } else {
      setIsInputEmpty(true);
      setIspending(false);
    }
    console.log(prompt);

    if (description !== "") {
      console.log("call API");
      for (let step = 0; step < 2; step++) {
        (async () => {
          try {
            const gptResponse = await openai.complete({
              engine: "davinci-instruct-beta",
              prompt: prompt,
              maxTokens: 200,
              temperature: 0.8,
              topP: 0.6,
              presencePenalty: 0,
              frequencyPenalty: 0.24,
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
        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className="form-div">
              <h3 className="service-name"> Bullet Point To Paragraph</h3>

              <div>
                <label className="input-label">Blog Title </label>
                <input
                  type="text"
                  value={keywords}
                  onChange={e => setKeywords(e.target.value)}
                  placeholder="e.g How to use AI for your business"
                ></input>
              </div>

              <div>
                <label className="input-label">Enter a bullet point: </label>
                <textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="e.g solution for the writers block"
                ></textarea>
              </div>

              {isPending ? (
                <button disabled>Generating Captions</button>
              ) : (
                <button>Click to Generate</button>
              )}
            </div>
          </form>
        </div>
      </div>

      <div className="box2">
        {isInputEmpty && (
          <div className="empty-input">Please add a description</div>
        )}
        {isPending && <div className="loading">Loading....</div>}
        <div className="scroll">
          <div>
            {data.map(item => (
              <Result data={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulletToPara;
