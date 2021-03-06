import React, { useContext } from "react";
import { InputBase } from "@material-ui/core";

import "./footer.scss";
import { ENTER_KEY } from "../../models/constants";
import { FooterContext } from "../../models/context/footer";

export const Footer: React.FC<{}> = () => {
  const footerContext = useContext(FooterContext);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === ENTER_KEY) {
      const value = event.currentTarget.value.trim();
      footerContext.addItem(value);
      event.currentTarget.value = "";
    }
  };

  return (
    <div className="footer-container">
      <InputBase
        onKeyDown={e => handleKeyDown(e as React.KeyboardEvent<HTMLInputElement>)}
        autoFocus={true}
        className="input"
        placeholder="..."
        inputProps={{ "aria-label": "..." }}
      />
    </div>
  );
};
