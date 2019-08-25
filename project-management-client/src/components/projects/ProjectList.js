// components/projects/ProjectList.js

import React, { Component } from 'react';
import AddProject from './AddProject';
import Project from './Project';
import axios from 'axios';
import * as actions from './../../redux/actions/actions';

// IMPORT REDUX `connect` HOC
import { connect } from 'react-redux';

class ProjectList extends Component {
  getAllProjects = () => {
    axios.get(`http://localhost:5000/api/projects`).then(response => {
      // this.setState({ listOfProjects: response.data });	 <--- DELETE
      console.log('response.data', response.data);

      this.props.addAllProjects(response.data);
    });
  };

  componentDidMount() {
    //  function `getAlProjects` GETs data from API and dispatches the action to Redux Store
    this.getAllProjects();
  }

  render() {
    const { projects } = this.props;

    return (
      <div>
        {/* After adding a projects, we will GET all projects again from API by calling updateProjectList() */}
        <AddProject updateProjectList={this.getAllProjects} />
        <div>
          {projects &&
            projects.map(project => {
              return <Project projectData={project} key={project._id} />;
            })}
        </div>
      </div>
    );
  }
}

//  `mapStateToProps` is used to save properties from Redux state onto the `props` of the current component
const mapStateToProps = state => {
  return {
    projects: state.projects,
  };
};

//  `mapDispatchToProps` is used to create methds that dispatch action objects to Redux,
// and save those methods on the `props` of the current component
const mapDispatchToProps = dispatch => {
  return {
    addAllProjects: allProjects =>
      dispatch(actions.addAllProjects(allProjects)),
  };
};

//  `connect` HOC takes `mapStateToProps` and `mapDispatchToProps` as parameters and component to connecto to redux
//  in this case `ProjectList`
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectList);
