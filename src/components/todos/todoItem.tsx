import { faFlag, faPencil, faTrash, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useState, useRef } from "react";
import Todo from "../../models/todos";
import TodoRadioButton from "./todoRadioButton";

interface props {
  todo: Todo;
  deleteTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
  updateTodo: (id: number, title: string) => void;
}

const TodoItem: FC<props> = ({ todo, deleteTodo, toggleTodo, updateTodo }) => {
  const [inputState, setInput] = useState<string>(todo.title);
  const [editState, setEdit] = useState<boolean>(false);
  const inputRef = useRef<HTMLDivElement>(null);
  const editHandler = async (): Promise<void> => {
    await setEdit(!editState);
    if (editState == true) {
      updateTodo(todo.id, inputState);
    } else {
      inputRef.current?.focus();
    }
  };
  const radioPriority = ():string=>{
    switch(todo.priority){
      case 1:
        return '#ff2e2e';
      case 2:
        return '#f7a63b';
      case 3:
        return '#39e344';
      default:
        return '#827d7e'
    }
  }


  return (
    <div className="flex mb-4 items-center border-2 p-2 border-gray-100 rounded-md ">
      <TodoRadioButton color={radioPriority()} clickHandler={()=> toggleTodo(todo.id)} isDone={todo.isDone}></TodoRadioButton>
      {todo.isDone ? (
        <input
          type="text"
          value={inputState}
          readOnly={editState ? false : true}
          disabled={editState ? false : true}
          onChange={(e) => setInput(e.target.value)}
          className={
            editState
              ? "bg-white w-full p-2 border-r-cyan-600 border-2 rounded-sm  dark:bg-gray-600 "
              : "bg-white w-full line-through  p-2  dark:bg-gray-600" 
          }
          style={{color:radioPriority()}}
          ref={inputRef}
        />
      ) : (
        <input
          type="text"
          value={inputState}
          readOnly={editState ? false : true}
          disabled={editState ? false : true}
          onChange={(e) => setInput(e.target.value)}
          className={
            editState
              ? "bg-white w-full p-2 border-r-cyan-600 border-2 rounded-sm dark:bg-gray-600" 
              : "bg-white w-full text-grey-darkest p-2 dark:bg-gray-600"
          }
          ref={inputRef}
        />
      )}
      <button
        className="flex-no-shrink p-2 ml-4 border-2 rounded text-neutral-600 border-neutral-600 hover:text-white hover:bg-neutral-600 dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-neutral-600 "
        onClick={() => editHandler()}
      >
        {editState ? "Confirm" : <FontAwesomeIcon icon={faPencil}></FontAwesomeIcon>}
      </button>
      <button
        className="flex-no-shrink p-2 ml-2 border-2 rounded text-red-600 border-red-600 hover:text-white hover:bg-red-600"
        onClick={() => deleteTodo(todo.id)}
      >
        <FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon>
      </button>

    </div>
  );
};

export default TodoItem;
