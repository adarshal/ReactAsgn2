import React from 'react'
import { useState, useEffect } from "react";

const Todo = ({task, onDelete2, onEdit2,onToggleComplete}) => {
    const [edit, setEdit] = useState(false);
  const [editText, setEditText] = useState(task.title);
//   console.log(task.title)
const editCompleted=((e) => {if (e.key === "Enter") {
    setEdit(!edit);
    task.title=editText;
    fetch(`https://jsonplaceholder.typicode.com/todos/${task.id}`, {
    method: "PUT",
    body: JSON.stringify(editText),
  })
  }
})

  return (
    <label className="container">
      <input
        type="checkbox"
        id={task.id}
        checked={task.completed}
        className="custom-checkbox"
        onChange={() => onToggleComplete(task.id)} // Handle checkbox toggle
      />
      
      {edit?
      (<div><input
        type="text"
        value={editText}
        onChange={(e) => {
          setEditText(e.target.value);
          
        }}
        onKeyDown={editCompleted}        
        /> 
        <span className="checkmark" /> </div>):
    (<><label htmlFor={task.id} >{task.title}</label>
    <span className="checkmark" /> </>)}
    
 
    
      <div className="delete-img">
        <i
          className="fa-solid fa-trash-can delete"
          onClick={() =>{ onDelete2()
        }
           } // Handle deletion
        />
        {!edit &&(<i
          className="fa-regular fa-pen-to-square"
          onClick={() => setEdit(!edit)} // Handle deletion
        />)
    }
        
      </div>
    </label>
  )
}

export default Todo
