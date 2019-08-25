// components/projects/ProjectList.js

import React, { Component } from 'react';
import axios from 'axios';
import AddProject from './AddProject';
import Project from './Project';

class ProjectList extends Component {
  state = {
    listOfProjects: [],
  };

  getAllProjects = () => {
    axios.get(`http://localhost:5000/api/projects`).then(response => {
      this.setState({ listOfProjects: response.data });
    });
  };

  componentDidMount() {
    this.getAllProjects();
  }

  render() {
    const { listOfProjects } = this.state;

    return (
      <div>
        <AddProject updateProjectList={this.getAllProjects} />
        <div>
          {listOfProjects &&
            listOfProjects.map(project => {
              return <Project projectData={project} key={project._id} />;
            })}
        </div>
      </div>
    );
  }
}

export default ProjectList;
