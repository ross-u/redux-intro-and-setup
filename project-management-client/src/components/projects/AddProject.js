// components/projects/AddProject.js

import React, { Component } from 'react';
import axios from 'axios';

// IMPORT REDUX `connect` HOC
import { connect } from 'react-redux';
import * as actions from './../../redux/actions/actions';

class AddProject extends Component {
  state = { title: '', description: '' };

  handleFormSubmit = event => {
    event.preventDefault();
    const { title, description } = this.state;

    axios
      .post(`http://localhost:5000/api/projects`, { title, description })
      .then(() => {
        this.props.addProject({ title, description });

        this.setState(
          { title: '', description: '' },
          this.props.updateProjectList(),
        );
      });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={e => this.handleChange(e)}
          />

          <label>Description:</label>
          <textarea
            name="description"
            value={this.state.description}
            onChange={e => this.handleChange(e)}
          />

          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

//  `mapDispatchToProps` is used to create methds that dispatch action objects to Redux,
// and save those methods on the `props` of the current component
const mapDispatchToProps = dispatch => {
  return {
    addProject: project => dispatch(actions.addProject(project)),
  };
};

//  `connect` HOC takes `mapStateToProps` and `mapDispatchToProps` as parameters and component to connecto to redux
//  in this case `AddProject`
export default connect(
  null,
  mapDispatchToProps,
)(AddProject);
