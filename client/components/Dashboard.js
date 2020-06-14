import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// on click, state should load that course's questions!


const Dashboard = ({ courses, score, name }) => {
  const courseButtons = [];
  // onClick, each button should fetch data on the specific course
  // when the backEnd is ready, use a get request with a param id containing course ID
  for (let i = 0; i < courses.length; i++) {
    const { id, courseName } = courses[i];
    courseButtons.push(
      <button id={id} key={id}>
        {courseName}
      </button>
    );
  }
  return (
    <div>
      <h1>Hi, {name}</h1>
      <h1>Your score is {score}</h1>
      <div className="dashboard center">{courseButtons}</div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  courses: state.auth.user.courses,
  score: state.auth.user.score,
  name: state.auth.user.firstName,
});

export default connect(mapStateToProps)(Dashboard);
