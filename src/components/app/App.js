import React from "react";
import Header from "../header/Header";
import * as Tesseract from "tesseract.js";
import "./App.css";

const title = "Quote Keeper";

const handleChange = e => {
  const files = e.target.files,
    uploads = [];

  if (files && files.length) {
    for (let key in files) {
      if (!files.hasOwnProperty(key)) continue;

      uploads.push(URL.createObjectURL(files[key]));
    }
  }
};

const App = () => {
  return (
    <div className="App">
      <Header title={title} />
      <section>
        <label className="fileUploaderContainer">
          <input
            id="fileUploader"
            type="file"
            onChange={handleChange}
            multiple
          />
        </label>
        <div />
      </section>
    </div>
  );
};

export default App;
