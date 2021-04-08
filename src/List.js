import React, { useState } from "react";
import { VscEdit, VscChromeClose } from "react-icons/vsc";

const List = ({ items, removeItem, editItem }) => {
  return (
    <div>
      {items.map((item) => {
        const { id, title } = item;
        return (
          <div className="task" key={id}>
            <div className="title">{title}</div>
            <div className="icons">
              <VscEdit
                style={{
                  color: "green",
                  fontSize: "1.4rem",
                  marginRight: "1rem",
                  cursor: "pointer",
                }}
                onClick={() => {
                  editItem(id);
                }}
              />
              <VscChromeClose
                style={{
                  color: "red",
                  fontSize: "1.4rem",
                  cursor: "pointer",
                }}
                onClick={() => {
                  removeItem(id);
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default List;
