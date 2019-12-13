import React from 'react';
import {
  withRouter
} from 'react-router-dom'


class Form extends React.Component {
  constructor(props) {
    super()
    this.state = {
      fullName: '',
      appName: '',
      deployUrl: '',
      gitHubRepo: '',
      project: null,
      myImage: null
    }
    this.textInput = React.createRef();
  }

  onFormSubmit = e => {
    this.props.onFormSubmit(e, this.state)
    this.props.history.push('/')
  }

  handleChange = e => {
    if (e.target.name === 'myImage') {
      this.setState({ myImage: e.target.files })
    } else {
      this.setState({ [e.target.name]: e.target.value })
    }
  }

  render() {
    console.log(this.props)
    return (
      <div className='col-md-6 offset-md-3'>
        <form className='new-form' onChange={e => this.handleChange(e)} onSubmit={e => this.onFormSubmit(e)}>
          <div className="form-group">
            <input type="text" placeholder="Full Name" className="form-control" ref={this.textInput} name="fullName" />
          </div>
          <div className="form-group">
            <input type="text" placeholder="App Name" className="form-control" ref={this.textInput} name="appName" />
          </div>
          <div className="form-group">
            <input type="text" placeholder="Deployed URL Link" className="form-control" ref={this.textInput} name="deployUrl" />
          </div>
          <div className="form-group">
            <input type="text" placeholder="GitHub Repo URL" className="form-control" ref={this.textInput} name="gitHubRepo" />
          </div>
          <div className="form-group">
            <select className="custom-select" name="project">
              <option value="" defaultValue>Choose Project</option>
              <option value="1">Project 1</option>
              <option value="2">Project 2</option>
              <option value="3">Project 3</option>
              <option value="4">Project 4</option>
            </select>
          </div>
          <div className="form-group custom-file">
            <label className="custom-file-label">Upload Screenshot:</label>
            <input type="file" className="custom-file-input form-control" name="myImage" />
          </div>
          <button type="submit" className="btn btn-success">Submit</button>
        </form>
      </div>
    )
  }
}

export default withRouter(Form)