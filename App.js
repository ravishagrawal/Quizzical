import React from "react"
import ReactDOM from "react-dom"
import he from "he"
import Quiz from "./Quiz"

export default function App() {
    const [quiz, setQuiz] = React.useState([])
    const [quizMode, setQuizMode] = React.useState("START") // Using 3 modes Start,Check,Restart
    const [score, setScore] = React.useState (0)
    const [colorChange, setColorChange] = React.useState (false)
    
    function fetchQuiz () {
        fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple")
            .then(res => res.json())
            .then(data => {
                const apiData = data.results
                const quizList = apiData.map(item => ({
                    question: he.decode(item.question),
                    ansCorrect: he.decode(item.correct_answer),
                    ansIncorrectOne: he.decode(item.incorrect_answers[0]),
                    ansIncorrectTwo: he.decode(item.incorrect_answers[1]),
                    ansIncorrectThree: he.decode(item.incorrect_answers[2])
                }))
                
                setQuiz(quizList)
            })
    }

    
    function generateQuiz () {
        fetchQuiz()
        setQuizMode ("CHECK")
        setScore (0)
    }
    
    function checkAnswers () {
        setQuizMode ("RESTART")
        setColorChange (true)
    }
    
    function restartQuiz() {
        setQuizMode("START");
        setQuiz([]); 
        setScore (0)
        setColorChange (false)
  }
    
    
    const quizElements = quiz.map (q => (
        <Quiz 
            question = {q.question}
            ansCorrect= {q.ansCorrect}
            ansIncorrectOne= {q.ansIncorrectOne}
            ansIncorrectTwo= {q.ansIncorrectTwo}
            ansIncorrectThree={q.ansIncorrectThree}
            addScore = {()=>setScore (oldScore =>(oldScore+1))}
            colorChange = {colorChange}
        
        />
        
    ))
    
    const buttonElement = () => {
        if (quizMode === "START") {
            return <button onClick = {generateQuiz}> Start Quiz </button>
        } else if (quizMode === "CHECK") {
            return <button onClick = {checkAnswers}> Check Answers </button>
        } else if (quizMode === "RESTART") {
            return (
                <div className= "check">
                    <p> You scored {score}/5 correct answers </p>
                    <button onClick = {restartQuiz}> Restart Quiz </button>
                </div>
                )
        }
    }

    return (
        <main>
            <h1> Quizzical </h1>
            <p className="intro"> Increase your General Knowledge </p>
            <div>{quizElements} </div>
            {buttonElement()}
        </main>
    )
}
