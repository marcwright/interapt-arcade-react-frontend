import React from 'react';

const Card = props => (
  <div className="col-xl-4 col-lg-4 col-md-6 col-12 animated fadeIn" key={props.project.id}>
    <div className="card box-shadow">
      <a href={props.project.gitHubRepo} rel="noopener noreferrer" target="_blank" role="button">
        <img className="card-img-top" data-src={props.project.imageUrl} alt="Thumbnail [100%x225]"
          src={props.project.imageUrl} />
      </a>
      <div className="card-body">
        <h6 className="card-text text-center">PROJECT {props.project.project}</h6>
        <p className="card-text text-center">{props.project.fullName.toUpperCase()}
          <span className="black">
            <a href={props.project.gitHubRepo} rel="noopener noreferrer" target="_blank" role="button">/{props.project.appName.toUpperCase()}</a>
          </span>
        </p>
        <div className="container">
          <a href={props.project.gitHubRepo} className="btn btn-light btn-outline-primary text-center col-lg-12 btn-sm" rel="noopener noreferrer" target="_blank" role="button">GitHub Repo</a>
        </div>
      </div>
    </div>
  </div >
)

export default Card
