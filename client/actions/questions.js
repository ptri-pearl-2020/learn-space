import axios from "axios";
import {
  QUESTIONS_LOADED,
  GET_NEXT_QUESTION,
  CORRECT_ANSWER,
  WRONG_ANSWER,
} from "../constants/actionTypes";

export const checkAnswer = (checkedId) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const url = `http://localhost:3000/answers/`;
  const body = JSON.stringify({ id: checkedId });

  try {
    // send a post request to answers
    const res = await axios.post(url, body, config);
    //check key
    //if res data has
    if (res.data.score) {
      dispatch({
        type: CORRECT_ANSWER,
        payload: res.data.score,
      });
    } else {
      dispatch({
        type: WRONG_ANSWER,
      });
    }
  } catch (err) {
    // login fail
    console.error(err);
  }
};

export const loadQuestions = (courseId, history) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const url = `http://localhost:3000/courses/${courseId}`;

  try {
    // send a post request to signup
    const res = await axios.get(
      `http://localhost:3000/courses/${courseId}`,
      config
    );

    const questionData = {};
    for (let question of res.data) {
      if (questionData.hasOwnProperty(question.questions))
        questionData[question.questions].push({
          id: question.id,
          answer: question.answer_text,
        });
      else
        questionData[question.questions] = [
          {
            id: question.id,
            answer: question.answer_text,
          },
        ];
    }


    const questionDataForState = [];
    for (let question in questionData) {

      questionDataForState.push({
        questionText: question,
        answers: questionData[question],
      });
    }

    dispatch({
      type: QUESTIONS_LOADED,
      payload: questionDataForState,
    });

    history.push("/questions");
  } catch (err) {
    // login fail
    console.error(err);
  }
};

export const newQuestion = () => (dispatch) => {

  dispatch({
    type: GET_NEXT_QUESTION,
  });
};
