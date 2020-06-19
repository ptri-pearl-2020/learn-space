import React from "react";

const Course = (props) => {
  const courseDict = {
    "JavaScript Course": "js-course",
    "Python Course": "py-course",
    "SQL Course": "sql-course",
  };
  console.log(props.id);
  return (
    <div
      className={`course ${courseDict[props.courseName]}`}
      id={props.id}
      onClick={props.onClick}
    >
      <div className="darkness-course">{props.courseName}</div>
    </div>
  );
};

export default Course;
