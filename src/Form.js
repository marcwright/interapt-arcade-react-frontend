import React from 'react';


class Form extends React.Component {
  constructor(props) {
    super()
    this.state = {
      fullName: '',
      appName: ',',
      deployUrl: '',
      gitHubRepo: '',
      project: null,
      myImage: null
    }
    this.textInput = React.createRef();
  }

  onFormSubmit = (e) => {
    this.props.onFormSubmit(e, this.state)
  }

  handleChange = e => {
    if (e.target.name === 'myImage') {
      this.setState({ myImage: e.target.files })
    } else {
      this.setState({ [e.target.name]: e.target.value })
    }
  }

  render() {
    console.log(this.state)
    return (
      <form className='new-form' onChange={e => this.handleChange(e)} onSubmit={e => this.onFormSubmit(e)}>
        <div className="form-group">
          <label>Full Name:</label>
          <input type="text" className="form-control" ref={this.textInput} name="fullName" />
        </div>
        <div className="form-group">
          <label>App Name:</label>
          <input type="text" className="form-control" ref={this.textInput} name="appName" />
        </div>
        <div className="form-group">
          <label>Deployed URL:</label>
          <input type="text" className="form-control" ref={this.textInput} name="deployUrl" />
        </div>
        <div className="form-group">
          <label>GitHub Repo:</label>
          <input type="text" className="form-control" ref={this.textInput} name="gitHubRepo" />
        </div>
        <div className="form-group">
          <label>Project:</label>
          <select name="project">
            <option value="1">Project 1</option>
            <option value="2">Project 2</option>
            <option value="3">Project 3</option>
            <option value="4">Project 4</option>
          </select>
        </div>
        <div className="form-group">
          <label>Upload Screenshot:</label>
          <input type="file" className="form-control" name="myImage" />
        </div>
        <button type="submit" className="btn btn-success">Submit</button>
      </form>
    )
  }
}

export default Form