import { useState } from "react";

const Parent = () => {
    const [count , setCount] = useState(0);

    function incrementCount(){
       
        setCount( (prevCount)=> {
            return prevCount + 1;
        });
    }

    function decrementCount(){
       
        setCount( (prevCount)=> {
            return prevCount - 1;
        });
    }
    
    return (
        <>  
            <p>Parent : {count}</p>
            <ChildA incrementCount={incrementCount} decrementCount={decrementCount} count={count} />
            <ChildB data={count}/>
        </> 
    )

}

const ChildA = (props)=>{
    function updateChild(){
        props.incrementCount();
    }

    function updateChildDec(){
        props.decrementCount();
    }
    

    return (
        <>
            <p>Child A : {props.count}</p>
            <button onClick={updateChild}>Increment </button>
            <button onClick={updateChildDec}>Decrement </button>
        </>
    )
}


const ChildB = (props) => {
    return (
        <>
            Child B : {props.data}
        </>
    )
}

export default Parent;