import { useState } from "react";

export default function App() {
  const [secretNumber, setSecretNumber] = useState(
    Math.trunc(Math.random() * 20) + 1
  );
  const [score, setScore] = useState(20);
  const [highScore, setHighScore] = useState(0);
  const [message, setMessage] = useState("Start guessing...");
  const [number, setNumber] = useState(0);
  const [showSecretNumber, setShowSecretNumber] = useState(false);
  const [wonGame, setWonGame] = useState(false);

  function handleCheck() {
    if (!number) {
      setMessage(() => "⛔️ No number!");
    } else if (number === secretNumber) {
      setMessage(() => "🎉 Correct Number!");
      setShowSecretNumber(() => true);
      setWonGame(true);
      if (score > highScore) {
        setHighScore(() => score);
      }
    } else if (number !== secretNumber) {
      if (score > 1) {
        setMessage(() =>
          number > secretNumber ? "📈 Too high!" : "📉 Too low!"
        );
        setScore(() => score - 1);
      } else {
        setMessage(() => "💥 You lost the game!");
        setScore(() => 0);
      }
    }
  }

  function handleAgain() {
    setSecretNumber(Math.trunc(Math.random() * 20) + 1);
    setScore(20);
    setShowSecretNumber(false);
    setMessage("Start guessing...");
    setNumber(0);
    setWonGame(false);
  }

  return (
    <div style={{ backgroundColor: wonGame ? "#60b347" : "#222" }}>
      <Header
        showSecretNumber={showSecretNumber}
        secretNumber={secretNumber}
        wonGame={wonGame}
        onAgain={handleAgain}
      />
      <Main
        number={number}
        message={message}
        score={score}
        highScore={highScore}
        onCheck={handleCheck}
        setNumber={setNumber}
      />
    </div>
  );
}

function Header({ showSecretNumber, secretNumber, wonGame, onAgain }) {
  return (
    <header>
      <h1>Guess My Number!</h1>
      <p className="between">(Between 1 and 20)</p>
      <button className="btn again" onClick={onAgain}>
        Again!
      </button>
      <div className="number" style={{ width: wonGame ? "30rem" : "15rem" }}>
        {showSecretNumber ? secretNumber : "?"}
      </div>
    </header>
  );
}

function Main({ number, message, score, highScore, onCheck, setNumber }) {
  return (
    <main>
      <section className="left">
        <input
          type="number"
          className="guess"
          min={0}
          max={20}
          value={number}
          onChange={(e) => setNumber(() => +e.target.value)}
        />
        <button className="btn check" onClick={onCheck}>
          Check!
        </button>
      </section>
      <section className="right">
        <p className="message">{message}</p>
        <p className="label-score">
          💯 Score: <span className="score">{score}</span>
        </p>
        <p className="label-highscore">
          🥇 Highscore: <span className="highscore">{highScore}</span>
        </p>
      </section>
    </main>
  );
}
