import React, { useState, useContext, useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import Add from "@material-ui/icons/Add";

import "./todos.scss";
import { Item, defaultItem } from "../../models/item-model";
import { TodoItem } from "../todoItem/todo-item";
import { FooterContext } from "../../models/context/footer";

export const Todos: React.FC<{}> = props => {
  const footerContext = useContext(FooterContext);

  const [items, setItems] = useState<Item[]>([]);
  const [prev, setPrev] = useState("");

  const deleteItem = (itemID: string) => {
    setItems(items.filter(item => item.id !== itemID));
  };

  const getAllItemsElements = () => {
    let itemElements: JSX.Element[] = [];
    items.forEach(item => {
      itemElements.push(<TodoItem key={item.id} onDeleteItem={deleteItem} item={item} />);
    });
    return itemElements;
  };

  const addItem = (name: string) => {
    setItems(items.concat([defaultItem(name)]));
  };

  const getNew = () => {
    if (prev !== footerContext.name) {
      setPrev(footerContext.name);
      addItem(footerContext.name);
    }
  };

  return (
    // <FooterContext.Consumer>
    //   {({ name }) => (
    //     <div>
    //       {/* {getNew()} */}
    //       {addItem(name)}
    //       <h1>{footerContext.name}</h1>
    //       {getAllItemsElements()}
    //     </div>
    //   )}
    // </FooterContext.Consumer>

    <div className="todo-list">
      {getNew()}
      {getAllItemsElements()}
    </div>
  );
};
