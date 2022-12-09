
import React, { useState } from "react";
import { data } from "../lib/data";


const Quiz = () => {
        const [currentQuestion, setCurrentQuestion] = useState(0);
        const [myAnswer, setMyAnswer] = useState("");
        const [score, setScore] = useState(0);
        const [finish, setFinish] = useState(false);
        const [show, setShow] = useState(false);
        const [clickAnswer, setClickAnswer] = useState(false);
      
        const checkAnswer = (variant) => {
          setMyAnswer(variant);
          setClickAnswer(true);
          // console.log(variant)
        };
      
        const checkCorrectAnswer = () => {
          if (myAnswer === data[currentQuestion].answer) {
            setScore(score + 1);
          }
        };
      
        const showAnswer = () => {
          setShow((show) => !show);
        };
        const reset = () => {
          setShow(false);
          setClickAnswer(false);
        };
      
        const finishHandler = () => {
          if (currentQuestion === data.length - 1) {
            setFinish(true);
          }
        };
      
        const startOver = () => {
          setCurrentQuestion(0);
          setFinish(false);
          setMyAnswer("");
          setScore(0);
        };
      
        if (finish) {
          return (
            <div className="container m-4 p-2 p-md-4 mx-auto vh-100 d-flex align-items-center flex-column justify-content-center">
                <h3 className="m-4 p-2 h-30 text-center fs-3 fw-bold">
                  {`Game Over! Your Final Score is
                  ${score}/${data.length - 1}
                  points.`}
                </h3>
                <button
                  className="btn btn-outline-dark fw-bold fs-4 mt-2 px-2 rounded-lg"
                  onClick={() => startOver()}
                >
                  Start Over
                </button>
            </div>
          );
        } else {
          return (
            <div className="container m-4 p-2 p-md-4 mx-auto vh-100 d-flex align-items-center flex-column justify-content-center" style={{maxWidth:'800px'}}>
                <h2 className="m-4 p-2 fw-bold fs-3">
                  {data[currentQuestion].question}
                </h2>
                <div className="w-100">
                <span className="fs-4 m-2 badge bg-secondary mx-auto px-5 text-center">
                Questions: {`${currentQuestion}/${data.length - 1}`}
              </span>
                </div>
                {data[currentQuestion].variants.map((variant) => (
                    <div className="m-2 card w-100 mx-auto text-center" key={variant.id}>
                     <div className="">
                     <p
                     className={`variant card-body fs-4 p-0 p-md-3 ${
                       myAnswer === variant
                         ? myAnswer === data[currentQuestion].answer
                           ? "correctAnswer"
                           : "incorrectAnswer"
                         : null
                     }`}
                     onClick={() => checkAnswer(variant)}
                   >
                     {variant}
                   </p>
                     </div>
                    </div>
                  ))}

                  {show && (
                    <p className="m-2 fs-4 text-center">
                      Correct Answer: {data[currentQuestion].answer}
                    </p>
                  )}
      
                {clickAnswer && (
                  <button
                    className="btn btn-outline-info fw-bold fs-4 mt-4 py-2 py-md-3 px-5 rounded-lg"
                    onClick={() => showAnswer()}
                  >
                    Show Answer
                  </button>
                )}
      
                {currentQuestion < data.length - 1 && (
                  <button
                    className="btn btn-outline-dark fw-bold fs-4 mt-4 rounded-lg px-5 py-2 py-md-3"
                    onClick={() => {
                      setCurrentQuestion(currentQuestion + 1);
                      checkCorrectAnswer();
                      reset();
                    }}
                  >
                    NEXT
                  </button>
                )}
      
                {currentQuestion === data.length - 1 && (
                  <button
                    className="btn btn-outline-danger fw-bold fs-4 mt-4 rounded-lg px-5 py-2 py-md-3"
                    onClick={() => finishHandler()}
                  >
                    FINISH
                  </button>
                )}
            </div>
          );
        }
      
}

export default Quiz