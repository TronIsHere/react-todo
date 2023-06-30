import { faClose, faFlag, faPager } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, FormEvent, useState, KeyboardEvent } from "react";
import Todo from "../../models/todos";
interface Props {
  add: (todo: Todo) => void;
}
const AddTodo: FC<Props> = ({ add }) => {
  const [stateInput, setInput] = useState<string>("");
  const [statePriority, setPriority] = useState<string>("");
  const [stateError, setError] = useState<boolean>(false);
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (stateInput !== "") {
      
      add({
        id: Date.now(),
        title: stateInput,
        isDone: false,
        editable: false,
        priority: statePriority == "" ? 4 : Number(statePriority)
      });
      setInput("");
    }else{
      showError(true);
    }
  };
  const keyDownHandle = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      submitHandler(event);
    }
  };
  const showError = (shown:boolean)=>{
    setError(shown);
  }
  return (
    <>
    {
      stateError ? <div className="bg-red-500 p-2 text-sm rounded-lg w-full text-white flex justify-between mb-4" >
      <span>The Input is empty please type something</span>
      <FontAwesomeIcon icon={faClose} size="lg" style={{paddingTop:2}} className={'cursor-pointer'} onClick={()=>{
        showError(false);
      }}></FontAwesomeIcon>
    </div> : ''
    }
      <div className="flex">
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-600 dark:bg-gray-600"
        placeholder="Add Todo + Enter"
        value={stateInput}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => keyDownHandle(e)}
      />
      <select id="priority" onChange={(e)=>setPriority(e.target.value)} className="bg-gray-50 border mr-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <option defaultValue={'-1'}>Select priority</option>
        <option value="1">Priority 1</option>
        <option value="2">Priority 2</option>
        <option value="3">Priority 3</option>
      </select>
      <button
        type="submit"
        onClick={submitHandler}
        className="flex-no-shrink p-2 border-2 rounded text-teal-600 border-teal-600 hover:text-white hover:bg-teal-600"
      >
        Add
      </button>
      </div>
    </>
  );
};

export default AddTodo;
