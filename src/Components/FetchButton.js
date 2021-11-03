import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import Button from "@mui/material/Button";

function FetchButton(props) {
  const questionCategory = useSelector(
    (state) => state.options.question_category
  );

  const questionDifficulty = useSelector(
    (state) => state.options.question_difficulty
  );

  const questionType = useSelector((state) => state.options.question_type);
  const questionIndex = useSelector((state) => state.index);
  const questionAmount = useSelector(
    (state) => state.options.amount_of_questions
  );

  console.log(`FetchButton Component`);

  const dispatch = useDispatch();

  const setLoading = (value) => {
    dispatch({
      type: "CHANGE_LOADING",
      loading: value,
    });
  };

  const setQuestions = (value) => {
    dispatch({
      type: "SET_QUESTIONS",
      questions: value,
    });
  };
  
  const handleQuery = async () => {
    let apiUrl = `https://opentdb.com/api.php?amount=${questionAmount}`
    
    if(questionCategory.length){
      apiUrl = apiUrl.concat(`&category=${questionCategory}`)
    }
    if(questionDifficulty.length){
      apiUrl = apiUrl.concat(`&difficulty=${questionDifficulty}`)
    }
    if(questionType.length){
      apiUrl = apiUrl.concat(`&type=${questionType}`)
    }
    setLoading(true);

    await fetch(apiUrl)
      .then((res) => res.json())
      .then((res) => {
        
        setQuestions(res.results);
        setLoading(false);
      })
      .catch((error) => console.log(error));

    if (questionIndex > 0) {
      dispatch({
        type: "SET_INDEX",
        index: 0,
      });

      dispatch({
        type: "SET_SCORE",
        score: 0,
      });
    }
    
  };
  return (
    <div>
      <Link className="link" to="/questions">
        <Button
          className="fetch-button"
          variant="contained"
          size="medium"
          onClick={handleQuery}
        >
          {props.text}
        </Button>
      </Link>
    </div>
  );
}

export default FetchButton;
