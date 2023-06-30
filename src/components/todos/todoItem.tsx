import { faFlag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useState, useRef } from "react";
import Todo from "../../models/todos";

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
  return (
    <div className="flex mb-4 items-center">
      {todo.isDone ? (
        <input
          type="text"
          value={inputState}
          readOnly={editState ? false : true}
          disabled={editState ? false : true}
          onChange={(e) => setInput(e.target.value)}
          className={
            editState
              ? "bg-white w-full p-2 border-r-cyan-600 border-2 rounded-sm  dark:bg-gray-600"
              : "bg-white w-full line-through text-green-600 p-2  dark:bg-gray-600" 
          }
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
        className="flex-no-shrink p-2 ml-4 border-2 w-32 rounded text-neutral-600 border-neutral-600 cursor-default dark:text-white dark:border-white "
      >
        {todo.priority == 4 ? 'No priority' : `Priority ${todo.priority}`}  
      </button>
      <button
        className="flex-no-shrink p-2 ml-4 border-2 rounded text-neutral-600 border-neutral-600 hover:text-white hover:bg-neutral-600 dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-neutral-600 "
        onClick={() => editHandler()}
      >
        {editState ? "Confirm" : "Edit"}
      </button>
      {todo.isDone ? (
        <button
          className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded w-32 hover:text-white text-grey-600 border-gray-600 dark:border-white hover:bg-gray-600"
          onClick={() => toggleTodo(todo.id)}
        >
          Not Done
        </button>
      ) : (
        <button
          className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green-600 border-green-600 hover:bg-green-600"
          onClick={() => toggleTodo(todo.id)}
        >
          Done
        </button>
      )}
      <button
        className="flex-no-shrink p-2 ml-2 border-2 rounded text-red-600 border-red-600 hover:text-white hover:bg-red-600"
        onClick={() => deleteTodo(todo.id)}
      >
        Remove
      </button>

    </div>
  );
};

export default TodoItem;
