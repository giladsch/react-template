import React, { useState, useRef } from "react";
import IconButton from "@material-ui/core/IconButton";
import Delete from "@material-ui/icons/Delete";
import Checkbox from "@material-ui/core/Checkbox";
import InputBase from "@material-ui/core/InputBase";

import "./todo-item.scss";
import { Item } from "../../models/item-model";
import { ESCAPE_KEY, ENTER_KEY } from "../../models/constants";

interface TodoItemProps {
  item: Item;
  onDeleteItem: (itemId: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = props => {
  const [itemName, setName] = useState(props.item.name);
  const [itemCompleted, setCompleted] = useState(props.item.completed ? props.item.completed : false);
  const [isItemBeingEdited, setItemEdited] = useState(false);
  const [editText, setEditText] = useState(itemName);
  let currentText = isItemBeingEdited ? editText : itemName;

  let textInput = useRef(null);

  const editItem = () => {
    setItemEdited(true);
    document.getElementById("itemLabel")?.focus();
  };

  const deleteItem = () => {
    props.onDeleteItem(props.item.id);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value) {
      setEditText(value);
    } else {
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === ESCAPE_KEY) {
      handleSubmit(itemName);
    } else if (event.keyCode === ENTER_KEY) {
      handleSubmit(editText);
    }
  };

  const handleSubmit = (editText: string) => {
    let text = editText.trim();
    setName(text);
    setEditText(text);
    setItemEdited(false);
  };

  const toggle = () => {
    setCompleted(!itemCompleted);
  };

  return (
    <div className={`view ${itemCompleted ? "completed" : ""}`}>
      <Checkbox
        color="primary"
        inputProps={{ "aria-label": "secondary checkbox" }}
        checked={itemCompleted}
        onChange={toggle}
      />
      <InputBase
        id="itemLabel"
        onDoubleClick={editItem}
        onKeyDown={e => handleKeyDown(e as React.KeyboardEvent<HTMLInputElement>)}
        onChange={e => handleChange(e as React.ChangeEvent<HTMLInputElement>)}
        disabled={!isItemBeingEdited}
        value={currentText}
        autoFocus={true}
        inputRef={textInput}
        className="label"
        placeholder="Search Google Maps"
        inputProps={{ "aria-label": "search google maps" }}
      />
      <IconButton
        onClick={deleteItem}
        className="destroy"
        color="secondary"
        aria-label="upload picture"
        component="span"
      >
        <Delete />
      </IconButton>
    </div>
  );
};
