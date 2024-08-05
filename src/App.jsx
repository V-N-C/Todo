import { useState } from "react";
import TodoData from "./TodoData.json";

function Navbar() {
  let form = {
    name: "",
    description: "",
    status: "",
    id: "",
  };
  //State to AddTodo
  const [addTodo, setAddtodo] = useState(form);
  //VDOM State
  const [todo, setTodo] = useState(TodoData);
  //State to filter Todo
  const [filterTodo, setFilterTodo] = useState(todo);
  //State to to find if edit is clicked
  const [edit, setEdit] = useState();
  //Function to create Unique ID
  const idCreate = () => {
    const tempId = `${Date.now()}`;
    addTodo.id = tempId;
    const obj = { id: tempId, ...addTodo };
    return obj;
  };
  //Add/Submit function
  const handleSubmit = (e) => {
    e.preventDefault();
    if (edit === undefined || edit === null || edit === "") {
      setTodo([...todo, idCreate()]);
      setFilterTodo([...todo, idCreate()]);
      setAddtodo(form);
      setEdit(null);
    } else {
      //item.id === id ? { ...item, value: newValue } : item

      // setFilterTodo([addTodo]);
      editDisplay(addTodo);
    }
  };
  //Function to Edit the Todo
  const editDisplay = (todos) => {
    todos.id = edit;
    const ind = todo.findIndex((todos) => todos.id === edit);
    let tempTodo = [...todo];
    tempTodo[ind] = todos;
    setTodo(tempTodo);
    setFilterTodo(tempTodo);
    setEdit(null);
    setAddtodo(form);
  };
  //Editing a Todo
  const editTodo = (id) => {
    setAddtodo(todo.find((todos) => todos.id === id));
    setEdit(id);
  };
  //OnChange function to Add todos
  const addTodos = (e) => {
    setAddtodo({
      ...addTodo,
      status: "Not Completed",
      [e.target.name]: e.target.value,
    });
  };

  //Status setting (Completed <-> Not Completed) to filter todo
  const statusChange = (e, id) => {
    if (e.target.value === "Not Completed") {
      e.target.style.background = "red";
      let obj = todo.findIndex((todos) => todos.id === id);
      todo[obj].status = "Not Completed";
    } else if (e.target.value === "Completed") {
      e.target.style.background = "green";
      let obj = todo.findIndex((todos) => todos.id === id);
      todo[obj].status = "Completed";
    }
  };

  //Filter Todo from status
  const statusFilter = (e) => {
    if (e.target.value === "Completed") {
      setTodo(filterTodo.filter((todos) => todos.status === "Completed"));
    } else if (e.target.value === "Not Completed") {
      setTodo(filterTodo.filter((todos) => todos.status === "Not Completed"));
    } else {
      setTodo(filterTodo);
    }
  };
  //Delete a Todo
  const deleteTodo = (id) => {
    setTodo(todo.filter((todos) => todos.id !== id));
    setFilterTodo(todo.filter((todos) => todos.id!== id));
  };

  return (
    <>
      <div className="container">
        <h1 className="row p-3 d-flex justify-content-center text-center">
          My Todo
        </h1>
        <form className="d-flex flex-row mb-3 gx-5">
          <div className="d-flex flex-row mb-3 p-2 ">
            <input
              type="text"
              name="name"
              value={addTodo.name}
              placeholder="Todo Name"
              className="form-control col m-2"
              onChange={(e) => addTodos(e)}
            />
            <input
              type="text"
              name="description"
              value={addTodo.description}
              placeholder="Todo Description"
              className="form-control col m-2"
              onChange={(e) => addTodos(e)}
            />
            <button
              type="submit"
              className="m-2 btn btn-success"
              onClick={handleSubmit}
            >
              Add Todo
            </button>
          </div>
        </form>
      </div>
      <div className="row">
        <h2 className="text-start">My Todos</h2>
        <h5 className="text-end">
          Status Filter : &nbsp;
          <select
            className="col btn"
            // value="name"
            style={{ width: "12%", background: "#FD8182" }}
            onChange={statusFilter}
          >
            <option value="All">All</option>
            <option value="Completed">Completed</option>
            <option value="Not Completed">Not Completed</option>
          </select>
        </h5>
      </div>
      <div className="d-md-flex flex-wrap">
        {todo.map((task) => (
          <div
            className="card p-2 m-2"
            key={task.id}
            style={{ width: "18rem", background: "#CCF5D3" }}
          >
            <div className="card-body">
              <p key={task.name} className="card-text mb-2">
                Name : {task.name}
              </p>
              <p className="card-text" key={task.description}>
                Description : {task.description}
              </p>
              <span>Status : </span>
              <select
                key={task.status}
                defaultValue={task.status}
                className="col"
                aria-label="Default select example"
                style={{
                  width: "70%",
                  background: task.status === "Not Completed" ? "red" : "green",
                }}
                onChange={(e) => statusChange(e, task.id)}
              >
                <option value="Not Completed">Not Completed</option>
                <option value="Completed">Completed</option>
              </select>
              <br />
              <br />
              <div className="ps-5 ms-5">
                <button
                  href="#"
                  className="btn btn-primary"
                  onClick={() => editTodo(task.id)}
                >
                  Edit
                </button>
                <button
                  href="#"
                  className="card-link btn btn-danger"
                  onClick={() => deleteTodo(task.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Navbar;