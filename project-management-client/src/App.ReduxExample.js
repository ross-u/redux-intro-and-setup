//	src/App.js
import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

import ProjectList from './components/projects/ProjectList';
import Navbar from './components/navbar/Navbar';
import ProjectDetails from './components/projects/ProjectDetails';
import TaskDetails from './components/tasks/TaskDetails';

// IMPORT REDUX
import { createStore } from "redux";

// INITIAL STATE OF THE STORE
const initialState = [];


// REDUCER - Function that Initializes the store state.
// the only way to perform some actions on the Redux store is through Reducer.
// Reducer is the only function that can change the store state/data.
const reducer = (storeState = initialState, action) => {
  console.log('action -> ', action);
  console.log('storeState -> ', storeState);

  switch(action.type) {   // The action type string
    case 'ADD_PROJECT':
      return [...storeState, action.data ];
    
      default:
      return storeState;
  }
}


// CREATE THE STORE
const store = createStore(reducer);

// ACTION - is command / object with `type`. It can also have payload of data to be placed in the store state.
// action is given to the Reducer as a command.
const action1 = { type: 'ADD_PROJECT', data: 'Project 1'};

//  SUBSCRIBE TO CHANGES IN STATE
store.subscribe( ()=> {
  console.log('State changed');
  console.log( store.getState() );
})

// DISPATCHING THE TASK / ACTION TO THE REDUCER
store.dispatch(action1);

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />

        <Switch>
          <Route exact path="/projects" component={ProjectList}/>
          <Route exact path="/projects/:id" component={ProjectDetails} />
          <Route exact path="/projects/:id/tasks/:taskId" component={TaskDetails} /> 
        </Switch>
      </div>
    );
  }
}

export default App;