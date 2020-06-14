import axios from "axios";
import data from "../data/data";

export const loadQuestions = (courseId) => (dispatch) => {
  dispatch({
    type: QUESTIONS_LOADED,
    payload: {
      questions: data.course_data[courseId].question_data,
      courseId,
    },
  });
};
