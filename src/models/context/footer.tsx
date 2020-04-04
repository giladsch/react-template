import React, { useState, useEffect } from "react";
import { CircularProgress } from "@material-ui/core";
import { Item, defaultItem, FilterTypes } from "../item-model";
import { delay, ITEMS_LOCAL_STORAGE_KEY } from "../constants";

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
  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {
    getItemsFromServer().then(() => {
      setShowSpinner(false);
    });
  }, []);

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
    if (!itemToDelete.completed) {
      setRemainings(todosRemainings - 1);
    }
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

  const getItemsFromServer = async (): Promise<void> => {
    await delay(1000);
    const itemsInLocalStorage = localStorage.getItem(ITEMS_LOCAL_STORAGE_KEY);
    const parsedItems = itemsInLocalStorage ? (JSON.parse(itemsInLocalStorage) as Item[]) : [];
    setItems(parsedItems);
    setRemainings(
      parsedItems.filter(item => {
        return !item.completed;
      }).length
    );
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
      {showSpinner ? <CircularProgress /> : props.children}
    </FooterContext.Provider>
  );
};
