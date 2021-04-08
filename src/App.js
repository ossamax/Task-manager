import React, { useState, useEffect } from "react";
import "./App.css";
import List from "./List";
import Alert from "./Alert";

function getLocalStorage() {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
}

function App() {
  const [list, setList] = useState(getLocalStorage());
  const [name, setName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  const handlSubmit = (e) => {
    e.preventDefault();

    if (name === "") {
      setAlert({ show: true, msg: "Opps Empty field !", type: "danger" });
      setInterval(() => {
        setAlert({
          show: false,
          msg: "",
          type: "",
        });
      }, 5000);
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setIsEditing(false);
    } else {
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");

      setAlert({
        show: true,
        msg: "Item Successfully added !",
        type: "success",
      });

      setInterval(() => {
        setAlert({
          show: false,
          msg: "",
          type: "",
        });
      }, 5000);
    }
    console.log("clicked");
  };
  const emptyItems = () => {
    setList([]);

    setAlert({
      show: true,
      msg: "All items Are Deleted !",
      type: "success",
    });
  };

  const removeItem = (id) => {
    setList(list.filter((item) => item.id !== id));
  };

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <div className="App">
      <div className="container">
        {alert.show && <Alert {...alert} />}
        <div className="header">
          <h3>Fast Task List Manager </h3>
        </div>

        <form onSubmit={handlSubmit}>
          <input
            type="text"
            placeholder="Enter a Task . . ."
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <button>{isEditing ? "edit" : "Submit"}</button>
        </form>

        <List items={list} removeItem={removeItem} editItem={editItem} />
        {list.length > 0 && (
          <button className="dlt_all" onClick={emptyItems}>
            Clear All
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
