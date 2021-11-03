import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";

const decodeHTML = function (html) {
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

function Question() {

  const [questions, setQuestions] = useState([]);
  const questionIndex = useSelector((state) => state.index);
  const history = useHistory();

   if (questions.length && questionIndex + 1 > questions.length) {
    history.push("/final"); }

  const [answerSelected, setAnswerSelected] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [options, setOptions] = useState([]);

  const score = useSelector((state) => state.score);
  const encodedQuestions = useSelector((state) => state.questions);

  console.log(`Question Component`);
  const dispatch = useDispatch();

  useEffect(() => {
    const decodedQuestions = encodedQuestions.map((q) => {
      return {
        ...q,
        question: decodeHTML(q.question),
        correct_answer: decodeHTML(q.correct_answer),
        incorrect_answers: q.incorrect_answers.map((answer) =>
          decodeHTML(answer)
        ),
      };
    });
    setQuestions(decodedQuestions);
  }, [encodedQuestions]);

  const question = questions[questionIndex];
  const answer = question && question.correct_answer;

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  useEffect(() => {
    if (!question) {
      return;
    }
    let answers = [...question.incorrect_answers];
    answers.splice(
      getRandomInt(question.incorrect_answers.length),
      0,
      question.correct_answer
    );
    setOptions(answers);
  }, [question]);

  const handleListItemClick = (event) => {
    setAnswerSelected(true);
    setSelectedAnswer(event.target.textContent);

    if (event.target.textContent === answer) {
      dispatch({
        type: "SET_SCORE",
        score: score + 1,
      });
    }

    if (questionIndex + 1 <= questions.length) {
      setTimeout(() => {
        setAnswerSelected(false);
        setSelectedAnswer(null);

        dispatch({
          type: "SET_INDEX",
          index: questionIndex + 1,
        });
      }, 1000);
    }
  };

  const getClass = (option) => {
    if (!answerSelected) {
      return ``;
    }

    if (option === answer) {
      return `correct`;
    }

    if (option === selectedAnswer) {
      return `selected`;
    }
  };
  
 

  if (!question) {
    return <div>Loading..</div>;     
  }

  return (
    <div className="container">
      <p>Question {questionIndex + 1}</p>
      <h3>{question.question}</h3>
      <ul>
        {options.map((option, i) => (
          <li
            key={i}
            onClick={handleListItemClick}
            className={getClass(option)}
          >
            {option}
          </li>
        ))}
      </ul>
      <div id="score-questions">
        Score: {score}/{questions.length}
      </div>
    </div>
  );
}

export default Question;
