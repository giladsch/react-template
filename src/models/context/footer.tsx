import React, { useState } from "react";
import { Item, defaultItem, FilterTypes } from "../item-model";

export interface IFooterContext {
  addItem: (name: string) => void;
  getItems: () => Item[];
  deleteItem: (item: Item) => void;
  changeFilter: (currentFilter: FilterTypes) => void;
  getFilter: () => FilterTypes;
  updateItem: (item: Item) => void;
  deleteCompleted: () => void;
  getTodosRemainings: () => number;
}

export const FooterContext = React.createContext<IFooterContext>({
  addItem: (name: string) => {},
  getItems: () => {
    return [];
  },
  deleteItem: (item: Item) => {},
  changeFilter: (currentFilter: FilterTypes) => {},
  getFilter: () => {
    return FilterTypes.ALL;
  },
  updateItem: (item: Item) => {},
  deleteCompleted: () => {},
  getTodosRemainings: () => {
    return 0;
  }
});

export const GlobalFooterContext: React.FC<{}> = props => {
  const [items, setItems] = useState<Item[]>([]);
  const [filter, setFilter] = useState(FilterTypes.ALL);
  const [todosRemainings, setRemainings] = useState(0);

  const addItem = (name: string) => {
    if (!!name) {
      setRemainings(todosRemainings + 1);
      setItems([...items, defaultItem(name)]);
    }
  };

  const getItems = () => {
    return items;
  };

  const deleteItem = (itemToDelete: Item) => {
    setItems(items.filter(item => item.id !== itemToDelete.id));
  };

  const changeFilter = (currentFilter: FilterTypes) => {
    setFilter(currentFilter);
  };

  const getFilter = () => {
    return filter;
  };

  const updateItem = (itemToUpdate: Item) => {
    let itemIndex = items.findIndex(item => item.id === itemToUpdate.id);
    items[itemIndex] = itemToUpdate;
    itemToUpdate.completed ? setRemainings(todosRemainings - 1) : setRemainings(todosRemainings + 1);
    setItems([...items]);
  };

  const deleteCompleted = () => {
    setItems(items.filter(item => !item.completed));
  };

  const getTodosRemainings = () => {
    return todosRemainings;
  };

  return (
    <FooterContext.Provider
      value={{
        addItem: addItem,
        getItems: getItems,
        deleteItem: deleteItem,
        changeFilter: changeFilter,
        getFilter: getFilter,
        updateItem: updateItem,
        deleteCompleted: deleteCompleted,
        getTodosRemainings: getTodosRemainings
      }}
    >
      {props.children}
    </FooterContext.Provider>
  );
};
