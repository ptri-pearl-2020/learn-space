import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { newQuestion } from "../actions/questions";
// the Dashboard will trigger the load questions action and load the course's questions into state.questions
import { checkAnswer } from "../actions/questions";

const Question = ({ currentQ, newQuestion, checkAnswer }) => {
  if (!currentQ) return <Redirect to="/dashboard" />;
  const currentQAnswers = currentQ.answers;

  const [checkedOption, changeOption] = useState({
    checkedName: "",
    checkedId: null,
    currentQId: currentQ.questionText,
  });
  const { checkedName, checkedId } = checkedOption;
  useEffect(() => {
    console.log('clearning Out checkID ')
    changeOption({
      checkedName: "",
      checkedId: null,
      currentQId: currentQ.questionText,
    })
  }, [])
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(`checkedId `, checkedId);
    //update score - make post req to answer route
    checkAnswer(checkedId);
    newQuestion();
    console.log('clearning Out checkID?? ')
    changeOption({
      checkedName: "",
      checkedId: null,
    })
  };

  return (
    <div className="container">
      <div className="form-wrap">
        <h3>{currentQ.questionText}</h3>
        <form className="questionForm" onSubmit={(e) => onSubmit(e)}>
          <div className="form-group" key="answer0">
            <input
              type="radio"
              id="answer0"
              name="answer0"
              value={currentQAnswers[0].id}
              checked={checkedName === "answer0"}
              onChange={() =>
                changeOption({
                  checkedName: "answer0",
                  checkedId: currentQAnswers[0].id,
                })
              }
            />
            <label
              onClick={() =>
                changeOption({
                  checkedName: "answer0",
                  checkedId: currentQAnswers[0].id,
                })
              }
            >
              {currentQAnswers[0].answer}
            </label>
          </div>
          <div className="form-group" key="answer1">
            <input
              type="radio"
              id="answer1"
              name="answer1"
              value={currentQAnswers[1].id}
              checked={checkedName === "answer1"}
              onChange={() =>
                changeOption({
                  checkedName: "answer1",
                  checkedId: currentQAnswers[1].id,
                })
              }
            />
            <label
              onClick={() =>
                changeOption({
                  checkedName: "answer1",
                  checkedId: currentQAnswers[1].id,
                })
              }
            >
              {currentQAnswers[1].answer}
            </label>
          </div>
          <div className="form-group" key="answer2">
            <input
              type="radio"
              id="answer2"
              name="answer2"
              value={currentQAnswers[2].id}
              checked={checkedName === "answer2"}
              onChange={() =>
                changeOption({
                  checkedName: "answer2",
                  checkedId: currentQAnswers[2].id,
                })
              }
            />
            <label
              onClick={() =>
                changeOption({
                  checkedName: "answer2",
                  checkedId: currentQAnswers[2].id,
                })
              }
            >
              {currentQAnswers[2].answer}
            </label>
          </div>
          <div className="form-group" key="answer3">
            <input
              type="radio"
              id="answer3"
              name="answer3"
              value={currentQAnswers[3].id}
              checked={checkedName === "answer3"}
              onChange={() =>
                changeOption({
                  checkedName: "answer3",
                  checkedId: currentQAnswers[3].id,
                })
              }
            />
            <label
              onClick={() =>
                changeOption({
                  checkedName: "answer3",
                  checkedId: currentQAnswers[3].id,
                })
              }
            >
              {currentQAnswers[3].answer}
            </label>
          </div>
          <button className="questionButton">Submit</button>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentQ: state.quest.currentQuestion,
});

export default connect(mapStateToProps, { newQuestion, checkAnswer })(Question);
