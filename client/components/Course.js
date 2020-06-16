import React from "react";

const Course = (props) => {
  const courseDict = { "Javascript Course": "js-course" };
  return (
    <div className={`course ${courseDict[props.courseName]}`}>
      <div className="darkness-course">{props.courseName}</div>
    </div>
  );
};

export default Course;
