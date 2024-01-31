// import { Tooltip as ReactTooltip} from 'react-tooltip'
import "./App.css";
import { useState, useEffect } from "react";
import Todo from "./Todo";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState([]);
  const handleChange = (e) => {
    setNewTask(e.target.value);
  };

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        setTodos(data.slice(0, 10));
      });
  }, []);

  // toggle completed
  const handleCompleted = (id) => {
    const updatedList = todos.map((e) => {
      if (e.id === id) {
        return { ...e, completed: !e.completed }; // Create a new object with updated completion state
      }
      return e;
    });
  
    setTodos(updatedList);
  };

  const appendNewTask = (e) => {
    if (e.key === "Enter") {
      if (!newTask) return;
      let item = {
        userId: 1,
        id: Date.now().toString(),
        title: newTask,
        completed: false,
      };
      setTodos([...todos, item]);
      setNewTask("");
      fetch("https://jsonplaceholder.typicode.com/todos", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          task:item
        }),
      });
    }
  };

  const onDelete = (id) => () => {
    console.log("inside dele")
    setTodos(todos.filter((w) => w.id !== id));
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`,{method:"DELETE"});
  };

  const onEdit = (id) => () => {    
    let item={};
    let todoAfterEdit=[];
    todos.forEach((v)=>{
      if(v.id===id){
        item=v;
      }else{
        todoAfterEdit.push(v); 
           }
      });
      setEditingItem(true);

  };

  return (
    <>
      <>
        <div>
          <h1>TODO React App</h1>
          <div className="holder">
            <input
              className="add-task"
              id="add"
              value={newTask}
              onChange={handleChange}
              placeholder="Add Task"
              onKeyDown={appendNewTask}
            />
            <span id="total-tasks">
              Total Tasks : <span id="counter"> {todos.length} </span>{" "}
            </span>
            <ul id="list">
              {todos.map((todo) => (
                <Todo task={todo} key={todo.id} onDelete2={onDelete(todo.id)} onEdit2={onEdit} 
                onToggleComplete={handleCompleted} />
              ))}
            </ul>
          </div>
        </div>
      </>
    </>
  );
}

export default App;
