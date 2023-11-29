import React, { useState, useRef } from "react"

function App() {
    const [result, setResult] = useState(0)
    const inputRef = useRef<HTMLInputElement>(null)

    function calculate(e: React.MouseEvent, mathAction: ((a: number, b: number) => number)) {
        if(inputRef.current)
            setResult(mathAction(result, Number(inputRef.current.value)))
        e.preventDefault()
    }

    return (
        <div className="App">
            <h1>Simplest Working Calculator</h1>
            <p>result: {result}</p>
            <p><input ref={inputRef} type="number"/></p>
            <button onClick={(e)=>calculate(e, (a,b)=> a+b)}>add</button>
            <button onClick={(e)=>calculate(e, (a,b)=> a-b)}>substract</button>
            <button onClick={(e)=>calculate(e, (a,b)=> a*b)}>multiply</button>
            <button onClick={(e)=>calculate(e, (a,b)=> a/b)}>divide</button>
            <button onClick={(e)=>{
                    if(inputRef.current) 
                        inputRef.current.value=''
                    e.preventDefault()
                }}>reset input</button>
            <button onClick={(e)=>calculate(e, ()=> 0)}>reset result</button>
        </div>
    )
}

export default App 
