// components/projects/AddProject.js

import React, { Component } from 'react';
import axios from 'axios';

// IMPORT REDUX `connect` HOC
import { connect } from "react-redux";

class AddProject extends Component {
  constructor(props){
      super(props);
      this.state = { title: "", description: "" };
  }
   
  handleFormSubmit = (event) => {
    event.preventDefault();
    const {title, description } = this.state;

    this.props.addProject({ title, description });
  }


  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState( {[name]: value} );
  }

  render(){
    return(
      <div>
        <form onSubmit={this.handleFormSubmit}>
          
          <label>Title:</label>
          <input type="text" 
            name="title" 
            value={this.state.title} 
            onChange={ (e) => this.handleChange(e) }/>
          
          <label>Description:</label>
          <textarea name="description" 
            value={this.state.description} 
            onChange={ (e) => this.handleChange(e) } />
          
          <input type="submit" value="Submit" />
        </form>
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
    addProject: (project) => dispatch( {type: 'ADD_PROJECT', data: project } )
  }
}

//  `connect` HOC takes `mapStateToProps` and `mapDispatchToProps` as parameters and component to connecto to redux
//  in this case `AddProject` 
export default connect(mapStateToProps, mapDispatchToProps)(AddProject);