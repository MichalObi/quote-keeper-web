import React, {Component} from "react";
import Header from "../header/Header";
import Loader from "../loader/Loader";
import * as Tesseract from "tesseract.js";
import "./App.scss";

const title = "Quote Keeper";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isGenerating: false,
      uploads: [],
      documents: []
    };
  }

  resetInput = e => e.target.value = null; // for reupload the same file

  handleChange = e => {
    const files = e.target.files,
      uploads = [];

    if (files && files.length) {
      for (let key in files) {
        if (!files.hasOwnProperty(key)) continue;

        const url = URL.createObjectURL(files[key]);

        uploads.push(url);

        this.setState({uploads: this.state.uploads.concat(uploads)});
      }
    }
  };

  generateText = e => {
    const uploads = this.state.uploads,
          documents = this.state.documents;

    if (uploads.length) {

      if (documents.length && uploads.length === documents.length) {
        alert("Upload new image first")
        return false;
      }

      this.setState({isGenerating: true, documents: []});

      for (let i = 0; i < uploads.length; i++) {
        Tesseract.recognize(uploads[i], {lang: "eng"})
          .catch(err => console.log(err))
          .then(({confidence, text}) => {
            this.setState({
              isGenerating: !(i+1 === uploads.length),
              documents: this.state.documents.concat({
                confidence,
                text
              })
            });
          });
      }
    }
  };

  clearAll = () => this.setState({uploads: [], documents: []});

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
                onClick={this.resetInput}
                multiple
              />
              <span className="file-custom" />
            </label>

            {this.state.uploads.length > 0 ?
              <div>
                <h3>Preview of all uploaded images</h3>
                <div className="files-preview">
                  {this.state.uploads.map((src, index) => {
                    return (
                      <div key={index}>
                        <img src={this.state.uploads[index]} alt="preview"/>
                      </div>
                    )
                  })}
                </div>
              </div>
            : null}

            <button
              onClick={this.generateText}
              disabled={this.state.isGenerating || this.state.uploads.length === 0}>
              Generate
            </button>
            <button
              onClick={this.clearAll}
              disabled={this.state.uploads.length === 0 && this.state.documents.length === 0}>
              Clear all
            </button>
          </div>

          {this.state.isGenerating ? <Loader/>: null}

          <div>
            {this.state.documents.map((src, index) => {
              return (
                <div key={index} className="files-uploads">
                  <img src={this.state.uploads[index]} width="400px"
                       alt="" />
                  <div className="files-uploads__text">
                    <span>
                      Confidence: <strong>{this.state.documents[index].confidence}</strong>
                    </span>
                    <p>{this.state.documents[index].text}</p>
                  </div>
                  <button>Delete</button>
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
