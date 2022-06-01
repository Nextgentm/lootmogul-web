import React from "react";
import { useRouter } from "next/router";

// import dynamic from 'next/dynamic'
// import MyPageLoader from "../src/components/MyPageLoader";
import Quiz from '../src/features/Quiz';
// const Quiz = dynamic(() => import("../src/features/Quiz"),  { loading: () => 
//   <MyPageLoader/>
//  })


const QuizPage = (props) => {
  const router = useRouter()
  const  pid = router.query.pid;
  const newProps = {...props,pid};
  return <Quiz {...newProps} ></Quiz>;
};

export default QuizPage;