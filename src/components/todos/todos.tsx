import React, { useContext } from "react";

import "./todos.scss";
import { TodoItem } from "../todoItem/todo-item";
import { FooterContext } from "../../models/context/footer";
import { FilterTypes, Item } from "../../models/item-model";

export const Todos: React.FC<{}> = () => {
  const footerContext = useContext(FooterContext);

  const deleteItem = (item: Item) => {
    footerContext.deleteItem(item);
  };

  const getAllItemsElements = () => {
    let itemElements: JSX.Element[] = [];
    const items = CurrentItems(footerContext.getFilter());

    items.forEach(item => {
      itemElements.push(<TodoItem key={item.id} onDeleteItem={deleteItem} item={item} />);
    });
    return itemElements;
  };

  const CurrentItems = (filter: FilterTypes) => {
    switch (filter) {
      case FilterTypes.ACTIVE:
        return getAllActive();
      case FilterTypes.COMPLETED:
        return getAllComplete();
      default:
        return getAllItems();
    }
  };

  const getAllComplete = (): Item[] => {
    return footerContext.getItems().filter(item => item.completed);
  };

  const getAllActive = (): Item[] => {
    return footerContext.getItems().filter(item => !item.completed);
  };

  const getAllItems = (): Item[] => {
    return footerContext.getItems();
  };

  return <div className="todo-list">{getAllItemsElements()}</div>;
};
