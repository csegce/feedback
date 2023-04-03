import React, { useState } from "react";
import { useEffect } from "react";
import "./login.css";
import styled from "styled-components";
import ShowMessage from "./PageElements/ShowMessage";
import { Box, Button } from "./PageElements/UIElements";
import ShowConfetti from "./ShowConfetti";
import Modal from "./Modal.js";

const BasicGrid = styled.div`
  display: grid;
  gap: 1rem;
`;
const QuestionCard = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [endQuiz, setEndQuiz] = useState(false);
  const [next, setn] = useState(true);
  const [end, sete] = useState(false);
  const [close, setc] = useState(true);
  const [sem, sets] = useState(8);
  const [post, setp] = useState([[0]]);
  const [questions,setq]=useState([[["",""],[""],[""],[""]],["","","",""],[["p","m"],["c","c"],["p","c"],["b"],[],[]]]);
  
  const nextQuestion = () => {
    let p = post.slice();
    p[(currentIndex-currentIndex%20)/20][(currentIndex%20-(currentIndex%20)%5)/5]+=Number(document.getElementsByClassName("ans")[0].getAttribute("data-key"))+1;
    setp(p);
    document.getElementsByClassName("ans")[0].classList.remove("ans");
    setn(true);
  };

  useEffect(() => {
    if (post[0][0] == 0) return;
    if (currentIndex === questions[2][sem-3].length*20 - 1) {
      endOfQuiz();
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  }, [post]);

  useEffect(() => {
    if (sem == 8) return;
    let p=[]
    for(let i=0;i<questions[2][sem-3].length;i++)
    p.push([0,0,0,0]);
    setp(p);
      setc(false);
  }, [sem]);

  useEffect(()=>{
    fetch("https://feedback-server-oj2d.onrender.com/questions").then((j)=>j.json()).then((j)=>setq(j[0].qu));
  },[]);

  const verify = () => {
    if (document.getElementsByClassName("sem")[0].value.trim() != "") {
      sets(Number(document.getElementsByClassName("sem")[0].value.trim()));
    }
  };

  const endOfQuiz = async() => {
    try{
    return await fetch("https://feedback-server-oj2d.onrender.com/"+sem, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({post:post, sem:sem}),
    }).then((j) => {
      setEndQuiz(true);
      sete(true);
      window.setTimeout(() => {
        sete(false);
      }, 4000);
      setCurrentIndex((prev) => prev + 1);
    });}
    catch(er){alert("Network error refresh and start over")}
  };

  if (endQuiz) {
    return (
      <>
        <ShowConfetti whenToShow={endQuiz} />
        {end && <ShowMessage />}
      </>
    );
  }

  return (
    <>
      <Modal close={close}>
        <div className="login">
          <h1 className="head">Login</h1>
          <div className="lab">
            <label>Sem : </label>
            <input list="sem" type="text" className="sem" />
            <datalist id="sem">
              <option value="3" />
              <option value="4" />
              <option value="5" />
              <option value="6" />
              <option value="7" />
            </datalist>
          </div>
          <button className="submit" onClick={verify}>
            Submit
          </button>
        </div>
      </Modal>
      <Box className="question-box m-full-y">
        <div className="top">
          <h4 className="top-text">
            question {currentIndex + 1} of {20*questions[2][(sem-3)%5].length}{" "}
            {questions[2][(sem-3)%5][(currentIndex-currentIndex%20)/20]}
          </h4>
          <div className="question">
            <h2
              className="question-text"
              style={{ fontSize: "clamp(1rem, 5vw, 2.5rem)" }}
            >
              {questions[0][currentIndex%20]}
            </h2>
          </div>
        </div>

        <BasicGrid className="answers-row middle">
          {
            questions[1].map((answer, key) => (
            <Button
              onClick={(e) => {
                if (
                  document
                    .getElementsByTagName("Button")[0]
                    .classList.contains("ans") ||
                  document
                    .getElementsByTagName("Button")[1]
                    .classList.contains("ans") ||
                  document
                    .getElementsByTagName("Button")[2]
                    .classList.contains("ans") ||
                  document
                    .getElementsByTagName("Button")[3]
                    .classList.contains("ans")
                )
                  document
                    .getElementsByClassName("ans")[0]
                    .classList.remove("ans");
                e.currentTarget.classList.add("ans");
                setn(false);
              }}
              key={key} data-key={key}
            >
              {answer}
            </Button>
          ))}
        </BasicGrid>

        <div className="bottom">
          <Button className="secondary" disabled={next} onClick={nextQuestion}>
            Next
          </Button>
        </div>
      </Box>
    </>
  );
};

export default QuestionCard;
