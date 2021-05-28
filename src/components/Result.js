import "./RunApp.css";

const Result = props => {
  return (
    <div className="results">
      <p>{props.data}</p>
    </div>
  );
};

export default Result;
