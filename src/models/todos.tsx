export default interface Todo{
    id?:number | string,
    title:string,
    isDone:boolean,
    editable:boolean,
    priority?:number
  }

