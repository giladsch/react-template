import React, { useContext } from "react";

import "./router.scss";
import { FooterContext } from "../../models/context/footer";
import { FilterTypes } from "../../models/item-model";

// todo change name
export const AppRouter: React.FC<{}> = () => {
  const footerContext = useContext(FooterContext);

  const changeFilter = (filter: FilterTypes) => {
    footerContext.changeFilter(filter);
  };

  const clearCompleted = () => {
    footerContext.deleteCompleted();
  };

  const getTodosRemainings = (): number => {
    return footerContext.getTodosRemainings();
  };

  return (
    <div className="todos-router">
      <span>items left {getTodosRemainings()}</span>
      <span
        className="pointer"
        onClick={e => {
          changeFilter(FilterTypes.ALL);
        }}
      >
        {FilterTypes.ALL}
      </span>
      <span
        className="pointer"
        onClick={e => {
          changeFilter(FilterTypes.ACTIVE);
        }}
      >
        {FilterTypes.ACTIVE}
      </span>
      <span
        className="pointer"
        onClick={e => {
          changeFilter(FilterTypes.COMPLETED);
        }}
      >
        {FilterTypes.COMPLETED}
      </span>
      <span className="pointer" onClick={clearCompleted}>
        clear completed
      </span>
    </div>
  );
};

export default AppRouter;
