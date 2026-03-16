import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0); // this is your state think of it like all you variables that you'll pass to different^2 fn's 
  const [todos, setTodo] = useState([
    {
    title: "going to gym",
    description: "gold's gym morning 7 am",
    completed: false
    },
    {
    title: "going to office",
    description: "office work meetings and coding",
    completed: false
    },
])
function addTodo(){
  setTodo([...todos,{
    title: "new_todo",
    description: "new todo description"
  }])
}
  return (
    <div>
      <button onClick={addTodo}>Add a random todo</button> <br></br>
      <CustomButton count = {count} setCount = {setCount}></CustomButton> 
      {/* <Todo title = {todo[0].title} description = {todo[0].description} setTodo = {setTodo}></Todo>
      <Todo title = {todo[1].title} description = {todo[1].description} setTodo = {setTodo}></Todo> */}
      {todos.map((todo) => {
        return <Todo title = {todo.title} description = {todo.description} setTodo = {setTodo}></Todo>
      })}
    </div>
  )
}

// my component
function CustomButton(props) {
  function onClickHandler() {
    props.setCount(props.count+1);
  }
  return <button onClick={onClickHandler}>counter {props.count}</button>
}
function Todo(props){
  return( <div>
    <h1>{props.title}</h1>
    <h2>{props.description}</h2>
    </div>
  )
}

export default App
