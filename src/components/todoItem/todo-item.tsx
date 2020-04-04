import React, { useState, useRef, useContext } from "react";
import IconButton from "@material-ui/core/IconButton";
import Delete from "@material-ui/icons/Delete";
import Checkbox from "@material-ui/core/Checkbox";
import InputBase from "@material-ui/core/InputBase";

import "./todo-item.scss";
import { Item } from "../../models/item-model";
import { ESCAPE_KEY, ENTER_KEY } from "../../models/constants";
import { FooterContext } from "../../models/context/footer";

interface TodoItemProps {
  item: Item;
  onDeleteItem: (item: Item) => void;
}

export const TodoItem: React.FC<TodoItemProps> = props => {
  const [item, setItem] = useState(props.item);
  const [isItemBeingEdited, setItemEdited] = useState(false);
  const [editText, setEditText] = useState(item.name);
  let currentText = isItemBeingEdited ? editText : item.name;

  let textInput = useRef(null);
  const footerContext = useContext(FooterContext);

  const editItem = () => {
    setItemEdited(true);
    document.getElementById("itemLabel")?.focus();
  };

  const deleteItem = () => {
    props.onDeleteItem(item);
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
      handleSubmit(item.name);
    } else if (event.keyCode === ENTER_KEY) {
      handleSubmit(editText);
    }
  };

  const handleSubmit = (editText: string) => {
    let text = editText.trim();
    item.name = text;
    setItem(item);
    setEditText(text);
    setItemEdited(false);
    footerContext.updateItem(item);
  };

  const toggle = () => {
    item.completed = !item.completed;
    debugger;
    setItem(item);
    footerContext.updateItem(item);
  };

  return (
    <div className={`view ${item.completed ? "completed" : ""}`}>
      <Checkbox
        color="primary"
        inputProps={{ "aria-label": "secondary checkbox" }}
        checked={item.completed}
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
