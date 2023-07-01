import { FC } from "react";

interface props {
 color: any,
 clickHandler: ()=> void,
 isDone: boolean
}

const TodoRadioButton: FC<props> = ({color,clickHandler,isDone})=> {
  
    return(
        <div className={`rounded-full border-2 w-5 h-4 flex items-center justify-center ml-3`} style={{borderColor : color}} onClick={()=>clickHandler()}>
        <div className={` w-2 h-2 rounded-full ${isDone? '' : 'hidden'}`} style={{backgroundColor : color}}></div>
      </div>
    )
}
export default TodoRadioButton;