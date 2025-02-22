import { useState } from 'react'

import './App.css'
import Problem from './Problem';
import Parent from './data-passing/parent';
import Todos from './todo/Todos';

function App() {
  const [count, setCount] = useState(0)
  const [showAnswer,setShowAnswer] = useState(false);

  const problems = [
    {
      question: "What is the capital of France?",
      answer: "The capital of France is Paris."
    },
    {
      question: "How many continents are there?",
      answer: "There are 7 continents on Earth."
    },
    {
      question: "What is the largest planet in our solar system?",
      answer: "The largest planet in our solar system is Jupiter."
    },
    {
      question: "Who wrote 'To Kill a Mockingbird'?",
      answer: "The author of 'To Kill a Mockingbird' is Harper Lee."
    },
    {
      question: "What is the square root of 64?",
      answer: "The square root of 64 is 8."
    },
    {
      question: "What is the chemical symbol for gold?",
      answer: "The chemical symbol for gold is Au."
    },
    {
      question: "Who painted the Mona Lisa?",
      answer: "The Mona Lisa was painted by Leonardo da Vinci."
    },
    {
      question: "What is the boiling point of water?",
      answer: "The boiling point of water is 100°C (212°F) at sea level."
    },
    {
      question: "What is the largest mammal?",
      answer: "The largest mammal is the blue whale."
    },
    {
      question: "Who was the first president of the United States?",
      answer: "The first president of the United States was George Washington."
    }
  ];

  const handlePrev = ()=> {
    setCount(count - 1);
    setShowAnswer(false);
  }

  const handleNext = ()=> {
    setCount(count + 1);
    setShowAnswer(false);
  }

  const handleAnswer = ()=> {
    setShowAnswer(!showAnswer);
  }

  return (
    <>
      {/* {
        <Problem { ...problems[count] } showAnswer={showAnswer} />
      }

      <button onClick={handlePrev} disabled={count <= 0} >Prev</button>
      <button onClick={handleNext} disabled={ count >= problems.length-1} >Next</button>
      <button onClick={handleAnswer}>Show Answer</button> */}

      {/* <Parent  /> */}
      
      <Todos />
      
    </>
  )
}


export default App


