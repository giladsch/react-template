import React, { useState } from "react";

export interface IFooterContext {
  name: string;
  setNewValue: (name: string) => void;
}

export const FooterContext = React.createContext<IFooterContext>({
  name: "",
  setNewValue: (name: string) => {}
});

export const GlobalFooterContext: React.FC<{}> = props => {
  const [value, setValue] = useState("");

  const setNewValue = (newValue: string) => {
    if (newValue !== "") {
      setValue(newValue);
    }
  };

  return (
    <FooterContext.Provider value={{ name: value, setNewValue: setNewValue }}>{props.children}</FooterContext.Provider>
  );
};
