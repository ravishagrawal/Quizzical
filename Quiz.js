import React from "react"

export default function Quiz (props) {
    
    const [ansArray,setAnsArray] = React.useState ([])
    const [checkAns, setCheckAns] = React.useState (false)
    
        
    React.useEffect(() => {
        const shuffle = (array) => {
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
            return array
        }
        
        const newArray = shuffle ([
            {option:props.ansCorrect,isSelected:false,indicator:"white"},
            {option:props.ansIncorrectOne,isSelected:false,indicator:"white"},
            {option:props.ansIncorrectTwo,isSelected:false,indicator:"white"},
            {option:props.ansIncorrectThree,isSelected:false,indicator:"white"}
        ])
        
        setAnsArray (newArray) 
     
  }, [props.question]);
  
  React.useEffect (() => {

      if (props.colorChange) {
          setCheckAns (true)
          setAnsArray((oldArray) => oldArray.map((ans) => ({
              ...ans,
              indicator: ans.option === props.ansCorrect ? "green" : ans.isSelected ? "red" : "white",
              })
            )
          ) 
      }
      
  }, [props.colorChange])
  
  function handleClick (event) {
      
      setAnsArray (oldArray => oldArray.map(ans =>({
          ...ans,
          isSelected: ans.option === event.target.id,
      })
      ))
      
      if (event.target.id===props.ansCorrect ) {
          props.addScore()
        }
  }
 
  const ansElements = ansArray.map((ans) => (
      <li 
        key={ans.option} 
        id={ans.option} 
        onClick ={handleClick} 
        className= {
            checkAns? 
            ans.indicator === "green" ? "list-default right" : 
            ans.indicator === "red" ? "list-default wrong": "list-default":
            ans.isSelected ? "list-default bg" : "list-default"
        }
        >
        {ans.option}
        
      </li>
      
      ));

    return (
        <div>
        <section>
            <div className="question-box">
                <h1 className="question"> {props.question}  </h1>
                <ul>
                  {ansElements}
                </ul>
            </div>
        </section>
        </div>
    )
}