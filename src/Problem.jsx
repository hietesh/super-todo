const Problem = ({question,answer,showAnswer}) => {
  return (
    <>
        <div>
            Question <br/>
            {question}
        </div>
        { showAnswer &&  ( <div> Answer <br/> {answer} </div>)}
    </>
  )
}

export default Problem