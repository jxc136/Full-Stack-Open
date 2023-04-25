import { useState } from "react";

const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>;
};

const App = () => {
  const [selected, setSelected] = useState(0);
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [votes, setVotes] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
  });

  const handleVotes = (selected) => {
    const newVotes = { ...votes, [selected]: votes[selected] + 1 };
    setVotes(newVotes);
    console.log(`new votes:`, votes[selected]);
  };

  const getAnecdote = () => {
    const randomNumber = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomNumber);
  };

  const mostPopular = () => {
    const maxVotes = Math.max(...Object.values(votes));
    const mostPopularIndex = Object.keys(votes).findIndex(
      (key) => votes[key] === maxVotes
    );
    const mostPopularAnecdote = anecdotes[mostPopularIndex];
    return mostPopularAnecdote;
  };

  return (
    <div>
      <h1>Anecdote of The Day</h1>
      <p>{anecdotes[selected]}</p>
      <p>Has {votes[selected]} votes</p>
      <Button
        text="Vote"
        onClick={() => {
          handleVotes(selected);
        }}
      />
      <Button
        onClick={() => {
          getAnecdote();
        }}
        text="New Anecdote"
      />
      <h1>Anecdote with most votes</h1>
      <p>{mostPopular()}</p>
    </div>
  );
};

export default App;
