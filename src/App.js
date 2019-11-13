import React from 'react';
import './App.css';
import Card from './Card';
import axios from 'axios';
import SearchBar from './SearchBar';
import Form from './Form';

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
        this.setState({
          projects: response.data.users,
          filteredProjects: response.data.users
        })
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

  onFormSubmit = (e, form) => {
    console.log(form)
    e.preventDefault()
    // const files = document.getElementById('file-input').files;
    // const file = files[0];
    const file = form.myImage[0];
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

  filterProjects = () => {
    const filteredProjectsArray = this.state.projects.filter(project => {
      return project.fullName.toLowerCase().includes(this.state.searchVal) || project.appName.toLowerCase().includes(this.state.searchVal)
    })
    return this.setState({ filteredProjects: filteredProjectsArray })
  }

  handleChange = e => {
    this.setState({ searchVal: e.target.value.toLowerCase() }, () => {
      return this.filterProjects()
    })
  }

  render() {
    console.log(this.state)

    const projectEls = this.state.filteredProjects.map(project => {
      return <Card key={project.id} project={project} />
    })
    return (
      <div className="App">
        <nav className="navbar navbar-expand-sm navbar-light bg-light fixed-top">
          <div className="container">
            <div className="row" id="nav-row">
              <div className="col-lg-4 col-10">
                <span className="form-intro">Intercade</span>
              </div>
              <div className="col-lg-4 col-2">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon  float-right"></span>
                </button>
              </div>
            </div>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                </li>
              </ul>
              <SearchBar
                searchVal={this.state.searchVal}
                handleChange={this.handleChange} />
            </div>
          </div>
        </nav>

        <Form onFormSubmit={this.onFormSubmit} />
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
