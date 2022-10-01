import React from "react";
import { useRouter } from "next/router";
import Quiz from '../src/features/Quiz';



const QuizPage = (props) => {
  const router = useRouter()
  const  pid = router.query.pid;
  const newProps = {...props,pid};
  return <Quiz {...newProps} ></Quiz>;
};

export default QuizPage;