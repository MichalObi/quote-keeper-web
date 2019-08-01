import React from "react";
import Header from "../header/Header";
import * as Tesseract from "tesseract.js";
import "./App.css";

const App = () => {
  const title = "Quote Keeper";

  return (
    <div className="App">
      <Header title={title} />
      <section>
        <label className="fileUploaderContainer">
          <input id="fileUploader" type="file" multiple />
        </label>
        <div />
      </section>
    </div>
  );
};

export default App;
