import { faMoon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react'
import AddTodo from './components/todos/addTodo'
import TodoItem from './components/todos/todoItem'
import Todo from './models/todos'
import './style.css'


function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [darkMode, setDarkMode] = useState<boolean>(true);

  function toggleDarkMode() {
    setDarkMode(prevDarkMode => !prevDarkMode)
  }
  const addTodo =  (todo:Todo):void=>{
     setTodos([
      ...todos,
      todo
    ]);
    const updatedTasks = [...todos,todo];
    localStorage.setItem('todoList',JSON.stringify(updatedTasks))
  };
  const removeTodo = (id:number) :void =>{
    setTodos(
      todos.filter((todo:Todo) => todo.id !== id)
    );
    const updatedTasks:Todo[] =  todos.filter((todo:Todo) => todo.id !== id);
    localStorage.setItem('todoList',JSON.stringify(updatedTasks))
    
  }


  const toggleTodo =  (id:number) : void=>{
    setTodos( todos.map((todo: Todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isDone: !todo.isDone
        }
      };
      return todo
    }));
  }
  const updateTodo =  (id:number,newTitle:string) : void=>{
    setTodos( todos.map((todo: Todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          title:newTitle
        }
      };
      return todo
    }));
  }
  useEffect(()=>{
    const storedItem:string = localStorage.getItem('todoList') || '';
    if(storedItem !== ''){
      setTodos(JSON.parse(storedItem));
    
    }
    
    // todos.map((todo:Todo)=>{console.log(todo,1)})
  },[])
  useEffect(()=>{
    if(todos.length > 0){
      localStorage.setItem('todoList',JSON.stringify(todos))
    }
  },[todos])
  return (
    <>
    <div className={`h-100 w-full flex items-center justify-center bg-teal-lightest font-sans h-screen ${darkMode? 'dark' : ''}`}>
      <div className="bg-white rounded shadow p-6 m-4 w-full  dark:bg-gray-600">
        <div className="mb-4">
         <div className='flex flex-row justify-between'>
         <h1 className="text-grey-darkest">Todo List</h1>
         <FontAwesomeIcon icon={faMoon} className={!darkMode?'bg-slate-300 p-2 rounded-lg cursor-pointer' :'bg-slate-700 p-2 rounded-lg text-white cursor-pointer'} onClick={()=>toggleDarkMode()}></FontAwesomeIcon>
         </div>
          
          <div className="flex flex-col mt-4">
          <AddTodo add={addTodo}/>
     
          </div>
        </div>
        <div>
          {todos.sort(function(a, b) {var keyA =a.priority,keyB =b.priority;if (keyA! < keyB!) return -1;if (keyA! > keyB!) return 1;return 0;}).map((todo:Todo)=><TodoItem todo={todo} key={todo.id} deleteTodo={removeTodo} toggleTodo={toggleTodo} updateTodo={updateTodo}/>)}
        </div>
      </div>
    </div>
  </>
  
  )
}

export default App