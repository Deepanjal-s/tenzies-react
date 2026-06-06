import { useState,useRef, useEffect } from 'react';
import Confetti from 'react-confetti';
import './App.css'
import Die from './Die'



function App() {
  
  
  function generateAllNewDice(){
    return new Array(10)
    .fill(0)
    .map(() => ({
      value : Math.ceil(Math.random()*6),
      isHeld : false,
      id : Math.random()
    }));
  }

  const [dice,setDice] = useState(() => generateAllNewDice())
  const buttonRef = useRef(null)

  const gameWon = dice.every(die => die.isHeld) && 
    dice.every(die => die.value === dice[0].value)

  useEffect(() => {
    if(gameWon){
      buttonRef.current.focus()
    }
  },[gameWon])

  function hold(id){
    setDice(oldDice => {
      return oldDice.map((die) => {
          return die.id === id ? {...die, isHeld : !die.isHeld} : die
      })
    })
  }


  const diceElements = dice.map((dieObj)=> {
    return <Die 
                value={dieObj.value}
                key={dieObj.id} 
                isHeld={dieObj.isHeld} 
                hold={hold}
                id={dieObj.id}
                gameWon={gameWon}
  />
  })
  
  function rollDice(){
    if(!gameWon){
      setDice(oldDice =>  oldDice.map(die => die.isHeld ? die : {...die, value : Math.ceil(Math.random()*6)}
      ))
    }else{
      setDice(generateAllNewDice())
    }
  }

  return (
    <>
      <main>
        {gameWon && <Confetti />}
        <div aria-live="polite" className="sr-only">{
          gameWon && <p>Congratulations you won, press "new game" to start again</p>}</div>
        <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className='diceContainer'>
          {diceElements}          
        </div>
        <button ref={buttonRef} className="roll" onClick={rollDice}>{gameWon ? "New Game" : "Roll"}</button>
      </main>
    </>
  )
}

export default App
