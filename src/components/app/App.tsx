import React, { useContext } from "react";

import logo from "../../logo.svg";
import "./App.scss";
import { Todos } from "../todos/todos";
import { Footer } from "../footer/footer";
import { GlobalFooterContext } from "../../models/context/footer";
import AppRouter from "../router/router";

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header> */}
      <GlobalFooterContext>
        <Footer />
        <Todos />
        <AppRouter></AppRouter>
      </GlobalFooterContext>
    </div>
  );
}

export default App;
