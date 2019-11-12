import React from 'react';
import './App.css';
import Card from './Card';
import axios from 'axios';

const server = `http://localhost:3010`
// const server = 'https://boiling-caverns-58324.herokuapp.com'

class App extends React.Component {
  constructor(props) {
    super()
    this.state = {
      file: null,
      projects: [],
      filteredProjects: [],
      searchVal: ''
    }
  }

  componentDidMount() {
    axios({
      url: `${server}/api/users`,
      method: 'get'
    })
      .then(response => {
        this.setState({ projects: response.data.users })
      })
  }

  uploadFile = (file, signedRequest, url) => {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', signedRequest);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.log(url)
        }
        else {
          alert('Could not upload file.');
        }
      }
    };
    xhr.send(file);
  }

  getSignedRequest = file => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${server}/sign-s3?file-name=${file.name}&file-type=${file.type}`);
    xhr.onreadystatechange = () => {
      console.log(xhr.responseText)
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          console.log(response)
          this.uploadFile(file, response.signedRequest, response.url);
        }
        else {
          alert('Could not get signed URL.');
        }
      }
    };
    xhr.send();
  }

  onFormSubmit = e => {
    e.preventDefault()
    const files = document.getElementById('file-input').files;
    const file = files[0];
    if (file == null) {
      return alert('No file selected.');
    }
    console.log(file)
    this.getSignedRequest(file);
    // const formData = new FormData();
    // formData.append('file-input', this.state.file);
    // this.getSignedRequest(formData);
  }

  onChange = e => {
    this.setState({ file: e.target.files[0] });
  }

  render() {
    console.log(this.state)

    const projectEls = this.state.projects.map(project => {
      return <Card key={project.id} project={project} />
    })
    return (
      <div className="App" >
        <div>File Upload</div>
        <form onSubmit={e => this.onFormSubmit(e)}>
          <h1>File Upload</h1>
          <input type="file" name="myImage" id="file-input" onChange={e => this.onChange(e)} />
          <button type="submit">Upload</button>
        </form>

        <main role="main">
          <div className="album py-5">
            <div className="container">
              <div className="row animated fadeIn">
                {projectEls}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
