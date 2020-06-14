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

import { QUESTIONS_LOADED } from "../constants/actionTypes";

const initialState = {};

export default function (state = initialState, action) {
  const { type, payload } = action;
  if (type === QUESTIONS_LOADED)
    return { ...state, questions: payload.questions };
  else return state;
}
