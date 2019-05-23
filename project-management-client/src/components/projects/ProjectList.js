// components/projects/ProjectList.js

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AddProject from './AddProject';
import data from './../../data'


class ProjectList extends Component {

  getAllProjects = () => {
    axios.get(`http://localhost:5000/api/projects`)
      .then((apiResponse) => {
        this.setState({ listOfProjects: apiResponse.data })
      })
  }

  componentDidMount() {
    this.getAllProjects();  
  }

  render() {

    return(
      <div>        
        <AddProject getData={this.getAllProjects} />   
        <div>
          { 
            this.props.projects.map( (project) => {
            return (
              <div key={project._id} className='project'>
                <Link to={`/projects/${project._id}`}>
                  <h3>{project.title}</h3>
                  <p>{project.description} </p>
                </Link>
              </div>
            )})
          }
        </div>

      </div>
    )
  }
}
 
export default ProjectList;