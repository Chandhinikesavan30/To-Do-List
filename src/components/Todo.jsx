import './CSS/Todo.css';
import { useState, useRef, useEffect } from 'react';
import TodoItems from './TodoItems';

let count = 0;
const Todo = () => {
  const [todos, setTodos] = useState([]);
  const inputRef = useRef(null);

  const add = () => {
    if (inputRef.current.value !== "") {
      setTodos([...todos, { no: count++, text: inputRef.current.value, display: "" }]);
      inputRef.current.value = "";
      localStorage.setItem("todos_count", count); // Save the latest count in localStorage
    }
  };

  // Load todos from localStorage when the component mounts
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos) {
      setTodos(savedTodos);
    }
    count = localStorage.getItem("todos_count") || 0; // Initialize count from localStorage or set to 0
  }, []);

  // Save todos to localStorage whenever the todos array changes
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  return (
    <div className='todo'>
      <div className='todo-header'>To-Do List</div>
      <div className='todo-add'>
        <input ref={inputRef} type='text' placeholder='Add Your Task' className='todo-input' />
        <div onClick={add} className='todo-add-btn'>ADD</div>
      </div>
      <div className='todo-list'>
        {todos.map((item, index) => {
          return <TodoItems key={index} setTodos={setTodos} no={item.no} display={item.display} text={item.text} />;
        })}
      </div>
    </div>
  );
};

export default Todo;
