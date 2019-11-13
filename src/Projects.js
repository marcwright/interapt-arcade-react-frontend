import React from 'react'
import Card from './Card';

const Projects = props => {
  return (
    < main role="main" >
      <div className="album py-5">
        <div className="container">
          {/* <div className="row animated fadeIn"> */}
          <div className="row">
            {props.filteredProjects.map(project => {
              return <Card key={project.id} project={project} />
            })}
          </div>
        </div>
      </div>
    </main >
  )
}

export default Projects