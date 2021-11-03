import React from "react";
import { useSelector, useDispatch } from "react-redux";
import FetchButton from "./FetchButton";

import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

function FinalScreen() {
  const score = useSelector((state) => state.score);
  const dispatch = useDispatch();

  console.log(`FinalScreen Component`);
  const replay = () => {
    dispatch({
      type: "SET_INDEX",
      index: 0,
    });

    dispatch({
      type: "SET_SCORE",
      score: 0,
    });
  };

  const settings = () => {
    dispatch({
      type: "SET_QUESTIONS",
      questions: [],
    });

    dispatch({
      type: "SET_SCORE",
      score: 0,
    });
  };

  return (
    <div className="container"> 
    <div className='final-container' >
      <h3>Final Score: {score}</h3>
      <Link className="link" to="/questions">
        <Button variant="contained" className='fetch-button' onClick={replay}>
          Try Again
        </Button>
      </Link>

      <FetchButton text="Fetch new questions" />

      <Link className="link" to="/">
        <Button
          variant="contained"
          className='fetch-button'
          onClick={settings}
        >
          Back to Settings
        </Button>
      </Link>
      </div>
    </div>
  );
}

export default FinalScreen;
