import React from 'react';
import './App.css';
import axios from 'axios';
import SearchBar from './SearchBar';
import Form from './Form';
import Projects from './Projects';
import SelectTag from './SelectTag';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

const server = 'https://intercade-backend.herokuapp.com'
// const server = process.env.NODE_ENV !== 'production' ? 'http://localhost:3010' : herokuUrl
// const server = 'http://localhost:3010'

class App extends React.Component {
  constructor(props) {
    super()
    this.state = {
      file: null,
      projects: [],
      filteredProjects: [],
      searchVal: '',
      selectTagVal: null
    }
  }

  componentDidMount() {
    console.log(document)
    axios({
      url: `${server}/api/users`,
      method: 'get'
    })
      .then(response => {
        console.log(response.data)
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

  getSignedRequest = (file, formData) => {
    console.log(formData)
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${server}/sign-s3?file-name=${file.name}&file-type=${file.type}&fullName=${formData.fullName}&appName=${formData.appName}&deployUrl=${formData.deployUrl}&gitHubRepo=${formData.gitHubRepo}&project=${formData.project}`);
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
    e.preventDefault()
    const file = form.myImage[0];
    if (file == null) {
      return alert('No file selected.');
    }
    console.log(form)
    this.getSignedRequest(file, form);
  }

  filterProjects = () => {
    const filteredProjectsArray = this.state.projects.filter(project => {
      return project.fullName.toLowerCase().includes(this.state.searchVal) || project.appName.toLowerCase().includes(this.state.searchVal)
    })
    return this.setState({ filteredProjects: filteredProjectsArray })
  }

  filterProjectsByNumber = () => {
    const filteredProjectsArray = this.state.projects.filter(project => {
      console.log(this.state)
      return project.project === this.state.selectTagVal
    })
    return this.setState({ filteredProjects: filteredProjectsArray })
  }

  handleChange = e => {
    this.setState({ searchVal: e.target.value.toLowerCase() }, () => {
      return this.filterProjects()
    })
  }

  handleSelectTagChange = e => {
    this.setState({ selectTagVal: parseInt(e.target.value) }, () => {
      return this.filterProjectsByNumber()
    })
  }

  render() {
    return (
      <Router basename='/'>
        <div className="App">
          <nav className="navbar navbar-expand-sm navbar-light bg-light fixed-top">
            <div className="container">
              <div className="row" id="nav-row">
                <div className="col-lg-4 col-10">
                  {/* <span className="form-intro">Interapt Skills</span> */}
                  <a href="/">
                    <img src="img/int_logo.png" alt="interapt logo" />
                  </a>
                </div>
                <div className="col-lg-4 col-2">
                  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon float-right"></span>
                  </button>
                </div>
              </div>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto center-nav-links">
                  <li className="nav-item active">
                    <Link to='/'>Home</Link>
                  </li>
                  <li>
                    <Link to='/newproject'>New Project</Link>
                  </li>
                  {/* <li>
                    <SelectTag handleChange={this.handleSelectTagChange} />
                  </li> */}
                </ul>



                <SearchBar
                  searchVal={this.state.searchVal}
                  handleChange={this.handleChange} />
              </div>
            </div>
          </nav>
          <Route exact path='/' component={() => <Projects filteredProjects={this.state.filteredProjects} />} />
          <Route path='/newproject' component={() => <Form onFormSubmit={this.onFormSubmit} />} />
        </div>
      </Router >
    );
  }
}

export default App;
