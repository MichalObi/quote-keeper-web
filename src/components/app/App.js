import React, {Component} from "react";
import Header from "../header/Header";
import * as Tesseract from "tesseract.js";
import "./App.css";

const title = "Quote Keeper";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uploads: []
    };
  }

  handleChange = e => {
    const files = e.target.files,
      uploads = [];

    if (files && files.length) {
      for (let key in files) {
        if (!files.hasOwnProperty(key)) continue;

        uploads.push(URL.createObjectURL(files[key]));

        this.setState({uploads});
      }
    } else {
      this.setState({uloads: []});
    }
  };

  render() {
    return (
      <div className="App">
        <Header title={title} />
        <section>
          <label className="fileUploaderContainer">
            <input
              id="fileUploader"
              type="file"
              onChange={this.handleChange}
              multiple
            />
          </label>
          <div>
            {this.state.uploads.map((src, index) => {
              return <img src={src} key={index} width="400px" />;
            })}
          </div>
        </section>
      </div>
    );
  }
}

export default App;
