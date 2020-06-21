/**
 * ************************************
 *
 * @module  marketsReducer
 * @author
 * @date
 * @description reducer for market data
 *
 * ************************************
 */

import {
  QUESTIONS_LOADED,
  GET_NEXT_QUESTION
} from "../constants/actionTypes";

const initialState = {
  questions: [],
  currentQuestionIndex: null,
  currentQuestion: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case QUESTIONS_LOADED:
      return {
        ...state,
        questions: payload,
        currentQuestionIndex: 0,
        currentQuestion: payload[0],
      };
    case GET_NEXT_QUESTION:
      if (state.questions[state.currentQuestionIndex + 1])
        return {
          ...state,
          currentQuestionIndex: state.currentQuestionIndex + 1,
          currentQuestion: state.questions[state.currentQuestionIndex + 1],
        };
      else return initialState;
    default:
      return state;
  }
}
