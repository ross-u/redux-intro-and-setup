// components/projects/ProjectList.js

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AddProject from './AddProject';
import data from './../../data'

// IMPORT REDUX `connect` HOC
import { connect } from 'react-redux'


class ProjectList extends Component {

  getAllProjects = () => {
    this.props.addAllProjects(data);
  }

  componentDidMount() {
    //  save the data from `data.js` file to Redux store
    //  function `getAlProjects` dispatches the action to Redux
    this.getAllProjects();  
  }

  render() {

    return(
      <div>         {/* After adding a projects,we will GET all projects again from API  */}
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

//  `mapStateToProps` is used to save properties from Redux state onto the `props` of the current component 
const mapStateToProps = (state) => {
  return {
    projects: state.projects
  }
}

//  `mapDispatchToProps` is used to create methds that dispatch action objects to Redux,
// and save those methods on the `props` of the current component 
const mapDispatchToProps = (dispatch) => {
 return {
   addAllProjects: (allProjects) => { dispatch( {  type: 'ADD_ALL_PROJECTS', data: allProjects} )  }
 }
}

//  `connect` HOC takes `mapStateToProps` and `mapDispatchToProps` as parameters and component to connecto to redux
//  in this case `ProjectList` 
export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);