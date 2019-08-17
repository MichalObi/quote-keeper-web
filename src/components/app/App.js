import React, {Component} from "react";
import Header from "../header/Header";
import * as Tesseract from "tesseract.js";
import "./App.css";

const title = "Quote Keeper";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uploads: [],
      documents: []
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

  generateText = e => {
    const uploads = this.state.uploads;

    if (uploads.length) {
      for (let i = 0; i < uploads.length; i++) {
        Tesseract.recognize(uploads[i], {lang: "eng"})
          .catch(err => console.log(err))
          .then(({confidence, text}) => {
            this.setState({
              documents: this.state.documents.concat({
                confidence,
                text
              })
            });
          });
      }
    }
  };

  render() {
    return (
      <div className="app">
        <Header title={title} />
        <section>
          <div>
            <label className="file">
              <input
                id="fileUploader"
                type="file"
                onChange={this.handleChange}
                multiple
              />
              <span className="file-custom" />
            </label>
            <button onClick={this.generateText}>Generate</button>
          </div>
          <div>
            {this.state.documents.map((src, index) => {
              return (
                <div key={index} className="files-uploads">
                  <img src={this.state.uploads[index]} width="400px" alt="" />
                  <div className="files-uploads__text">
                    <span>
                      Confidence:{" "}
                      <strong>{this.state.documents[index].confidence}</strong>
                    </span>
                    <p>{this.state.documents[index].text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    );
  }
}

export default App;
