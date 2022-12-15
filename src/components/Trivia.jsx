import React, {useEffect ,useState } from 'react'
import useSound from 'use-sound';
import play from "../assests/play.wav.mp3";
import correct from "../assests/correct.wav.mp3"
import wrong from "../assests/wrong.wav.mp3"

export default function Trivia({data,setStop,questionNumber,setQuestionNumber,})
 {
  const [question,setQuestion]=useState(null);
  const [selectedAnswer,setSelectedAnswer]= useState(null);
  const [className,setClassName]= useState("answer");
  const[letsplay]=useSound(play)
  const[correctAnswer]=useSound(correct)
  const[wrongAnswer]=useSound(wrong)
useEffect (()=>{
  letsplay();


},[letsplay]);

  useEffect(() => {
    setQuestion(data[questionNumber -1])
  
  }, [data,questionNumber]);

  const delay =(duration, callback) =>{
    setTimeout(()=> {
      callback();
      
    },duration)
  };

  const handleClick = (a) =>{
setSelectedAnswer(a);
setClassName("answer active");
delay(3000,()=>
setClassName(a.correct ?"answer correct": "answer wrong")
);
delay(6000,()=>
{
  if(a.correct){
    correctAnswer();
    setQuestionNumber((prev) => prev + 1);
      setSelectedAnswer(null);
  }else{
    wrongAnswer();
    setStop(true);
  }
}
);
  
setTimeout(() => {
  setClassName(a.correct ?"answer correct": "answer wrong")
}, 3000);
  };
  return (
    <div className='trivia'>
        <div className="question">{question?.question}</div>
        <div className="answers">
          {question?.answers.map((a) => (
            <div className={selectedAnswer === a ? className : "answer"} onClick={()=>handleClick(a)}> 
            {a.text}</div>
          ))}
        </div>
      
    </div>
  )
}
