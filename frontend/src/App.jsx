import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0); // this is your state think of it like all you variables that you'll pass to different^2 fn's 

  function updateCount(){
    setCount(count+1);
  }
  return (
    <div>
      <button onClick={updateCount}>counter {count}</button>
    </div>
  )
}

export default App
