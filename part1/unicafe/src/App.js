import { useState } from "react";

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  );
};

const Statistics = (props) => {
  const total = props.good + props.bad + props.neutral;
  const average = props.good - props.bad / total;
  const positive = (props.good / total) * 100;
  return (
    <div>
      <h1>Statistics</h1>
      {total === 0 ? (
        <p> No feedback Given</p>
      ) : (
        <>
          <table>
            <tbody>
              <StatisticLine text="Good Reviews:" value={props.good} />
              <StatisticLine text="Neutral Reviews:" value={props.neutral} />
              <StatisticLine text="Bad Reviews:" value={props.bad} />
              <StatisticLine text="Total:" value={total} />
              <StatisticLine text="Average:" value={average.toFixed(2)} />
              <StatisticLine
                text="Positive:"
                value={positive.toFixed(2) + "%"}
              />
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};
const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutal] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div className="App">
      <h1>Give Feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutal(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
