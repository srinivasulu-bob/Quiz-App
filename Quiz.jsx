
import React, { useRef, useState } from 'react'
import './Quiz1.css'
import { data } from '../../assets/data'

const Quiz = () => {

    const [index , setIndex] = useState(0);
    const [questions , setQuestions] = useState(data[index]);

    const [lock , setLock] = useState(false);
    const [score , setScore] = useState(0);
    const [result , setResult] = useState(false);

    let option1 = useRef(null);
     let option2 = useRef(null);
      let option3 = useRef(null);
       let option4 = useRef(null);

       let option_array = [option1 , option2 , option3 , option4];


    const checkAns = (e,ans) =>{
          if(lock === false){
            if(questions.ans === ans){
               e.target.classList.add("correct");
               setLock(true);
               setScore(pre => pre+1);
          }
          else{
            e.target.classList.add("wrong");
            setLock(true);
            option_array[questions.ans-1].current.classList.add("correct");
          }
          }
    }

    const next = () =>{
      if(lock === true){

           if(index === data.length-1){
            setResult(true);
            return 0;
           }

        setIndex(index+1);
        setQuestions(data[index]);
        setLock(false);

        option_array.map((opt) =>{
             opt.current.classList.remove("wrong");
              opt.current.classList.remove("correct");

              return null;
        })

        }   

    }

    const reset = () =>{
      setIndex(0);
      setQuestions(data[0]);
      setScore(0);
      setLock(false);
      setResult(false);
    }


  return (
        <div className="container">
            <h2>Quiz App</h2>
             <hr/>
             {result?<></> : <>
             <h2>{index+1}.{questions.question}</h2>
             <ul>
                <li ref={option1} onClick={(e) =>{checkAns(e,1)}}>{questions.option1}</li>
                <li ref={option2} onClick={(e) =>{checkAns(e,2)}}>{questions.option2}</li>
                <li ref={option3} onClick={(e) =>{checkAns(e,3)}}>{questions.option3}</li>
                <li ref={option4} onClick={(e) =>{checkAns(e,4)}}>{questions.option4}</li>
             </ul>
             <button onClick={next}>Next</button>
             <div className="index">{index+1} of {data.length} questions</div>
             </>}

             {result ? <>
             <h2>you scored {score} out of {data.length} </h2>
              <button onClick={reset}>Reset</button>
             </> : <></>}
        </div>
  )
}

export default Quiz
