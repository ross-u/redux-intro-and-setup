# Redux | Intro and Setup



#### What is Redux

Redux is a predictable state container for JavaScript apps.

It helps you write applications that behave consistently and are easy to test. 

You can use Redux together with [React](https://reactjs.org/), or with any other view library. It is tiny (2kB, including dependencies), but has a large ecosystem of addons available.





**Simply put, Redux is the library for the state management.** 

In a React app Redux helps us to manage the state by using **one store as a single source of truth**, instead of using many different components to save the state.





#### Less "prop drilling" and unnecessary re-rendering

Instead of having to update multiple components and pass data through all of the components in our way, with Redux we get the data directly from the Redux store. 

This way we don't need to pass the props through multiple components (prop drilling) and Redux store will update only the components that are connected to the Redux store.









![img](https://hackernoon.com/hn-images/1*87dJ5EB3ydD7_AbhKb4UOQ.png)













### Getting started with Redux



Clone the starter repository and checkout to the branch `starter-code` :



**In the terminal:**

```bash
# Clone the Repo with the app
git clone https://github.com/ross-u/redux-intro-and-setup.git

cd redux-intro-and-setup


# Switch to the branch `starter-code`
git checkout starter-code


# Install dependencies in the `project-management-server`
cd project-management-server && npm install


# Install dependencies in the `project-management-client`
cd ../project-management-client && npm install


# Run the React app in development mode.
npm start
```







#### Install Redux dependencies



**In the terminal:**

```bash
# In the `project-management-client` directory
npm install redux react-redux --save
```













#### What is the Redux store?

We can think of a Redux `store` as an empty object. A unstructured unlimited space, assigned to Redux. Store takes one or more reducers.

But `store` is essentially an object.





#### Creating Redux store

We create a Redux store with `createStore` method from `redux`. 

In `index.js` we will create a Redux `store` object and provide it to our application.







**In the `project-management-client`**

```jsx
//	src/index.js

// ...

// IMPORT REDUX
import { createStore } from "redux";
import { Provider } from 'react-redux';

// REDUCER
//	...

// CREATE REDUX STORE
const store = createStore(/* redux store takes reducer functions */);


// PROVIDE REDUX STORE ACCESS TO OUR APP
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
);
```





#### Error: expected reducer to be a function

At this time we should see an `Error` in our console, that happened because we didn't pass the first argument to the `createStore`.

We have to pass a `reducer` as the first argument to `createStore`.



**Syntax**

```jsx
createStore(reducer, [preloadedState], [enhancer])
```







#### What is a reducer ?



##### Reducer is a (pure) function that does two things: 

- Creates the initial/starting state in the Redux store. On initial run of Redux the store is an empty object, so reducer creates the initial space/state in the `store`. 
- Updates the store when it receives an action.



##### Essentially, each reducer creates and manages a slice of the space/state in the Redux store. 



We can think of it as a "warehouse worker" that has it's own storage room that it controls.



```js
// Warehouse = `Redux Store`  

// Storage Room/s = `Redux State` (space in the store)

// Warehouse Worker = `Reducer`

// Package with Instruction = `Action`
```







#### Create the reducer and pass it to the store



In order initialize the store state we pass the initial state as the default value to the `state` parameter.

Inside of the reducer we specify what to do on each action.  



Let's create our reducer with initial state, and with instruction for the `action` called `'ADD_PROJECT'` :

```jsx
//	src/index.js

// INITIAL STATE
const initialState = [];

//	REDUCER
const reducer = (state = initialState, action) => {
  switch(action.type) { 
          
    case 'ADD_PROJECT':
// Take the old state and create new state with the data from the action
      const newState = [...state, action.payload];
      return newState;
    
      default:
      return state;
  }
}

// CREATE REDUX STORE
const store = createStore(reducer);	// <--- PASS THE REDUCER

```







#### How does the reducer update the store?



Reducer updates the `store` by doing the following steps:

1. Gets the `old state` from the store, and creates a `state copy` from it .
2. Updates that `state copy` with new data.
3. Gives the new state back to the `store`.





#### What is an action ?



To start changing the Redux state, we have to give a command to the reducer. 

We call this command - an `action`. 

`action` is an object with the property`type` , which holds the name of the action.  `action` object can also include other properties.



**Redux `state` can be changed only by dispatching an `action` object**



Add the following after the line where we created the store:

```jsx
//	src/index.js


// CREATE REDUX STORE
const store = createStore(reducer);


// ACTION OBJECT
const addProject = { type: 'ADD_PROJECT', payload: 'My new project'};

// DISPATCHING THE ACTION TO THE REDUX STORE
store.dispatch(addProject);
```







#### Check the changes in state

We can check what is happening in out Redux store in 2 ways. 



1. We can subscribe and start listening to changes in store state. Remember to subscribe to the store before dispatching the action:



```jsx
//	src/index.js

// ...

//  SUBSCRIBE TO CHANGES IN REDUX STORE   <--- Subscribe before the dispatch
store.subscribe( ()=> {
  console.log('Redux store state changed!');
  console.log( store.getState() );
})

// ACTION
const addProject = { type: 'ADD_PROJECT', payload: 'My New Project' };

// DISPATCHING THE ACTION TO THE REDUX STORE
store.dispatch(action1);
```



2. We can also connect Redux DevTools to our store, to do this we have to update our `createStore` and include

   `window.__REDUX_DEVTOOLS_EXTENSION__ &&  window.__REDUX_DEVTOOLS_EXTENSION__()`

​    

**Update the `createStore()`**

```jsx
//	src/index.js

	...
    	...
    
// CREATE REDUX STORE
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__()
)
```



**Install the Google Chrome extension Redux DevTools**:

https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd











### Connecting our components to Redux



In the previous basic example we went over how to create the store, and explained what are reducer and actions. 

Getting data from the Redux store and dispatching of the actions is done by using `react-redux`'s   `connect()()`  Higher order component. 







#### **Proper structure and setup**



To ensure a proper structure and giving you a proper blueprint for your future projects with Redux, we will create separate folders for `reducers` and `actions`. 

This is is considered a good practice, which help to make your app structured and your Redux code well organized.





In the terminal, create the following directories and files:

```bash
cd src/

mkdir redux redux/reducers redux/actions redux/types

touch redux/reducers/projectReducer.js
touch redux/actions/actions.js
```







#### Import the reducer and provide it to the store 





We will move the `reducer`  from  `index.js` to a separate file `projectReducer.js` and import it to `index.js`

```jsx
//	redux/reducers/projectReducers.js


const initialState = {
  projects: [],
};

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PROJECT':
      const newState = [...state, action.payload];
      return newState;

    default:
      return state;
  }
};

export default projectReducer;
```



```jsx
//	src/index.js

...
...

import { createStore } from 'redux';
import { Provider } from 'react-redux'

// IMPORT THE REDUCER
import projectReducer from './redux/reducers/projectReducer';


// PASS THE REDUCER TO THE STORE
const store = createStore(projectReducer)

```









#### Write additional logic for action `'ADD_ALL_PROJECTS'`



```jsx
//	redux/reducers/projectReducers.js

...


//  ACTION  -   { type: 'ADD_PROJECT', payload: { ........ }  }

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PROJECT':
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };

    case 'ADD_ALL_PROJECTS':
      return {
        ...state,
        projects: [...action.payload],
      };

    default:
      return state;
  }
};

export default projectReducer;
```







#### Properly updating the state in the Redux store -  



You may be wondering why were we using the spread operators and creating new object and array when updating the state in `case 'ADD_PROJECT'` and `case 'ADD_ALL_PROJECTS'`.



To trigger the update of components when an action is dispatched, **Redux checks if the object is different (by checking reference). Redux does not check if the properties have changed**. 



Therefore:

- When we **return a new object**, Redux checks the reference (object's address in the memory) and sees that it is a new object. This **will trigger the update on the components connected to Redux**.
- If you **mutate** the object that it is already in the store (adding or changing a property, for example) **Redux will not see the change**, because object reference remained the same, so it will not update the components.













#### Connect the components using `connect()()`



Using a `connect` HOC from Redux we will connect our component to the Redux state.

The higher order component `connect` takes 2 parameters, and the component:

**Syntax**

```jsx
import { connect } from 'react-redux';

connect( mapStateToProps, mapDispatchToProps)(Component);
```



`mapStateToProps = () => {}` - is a function that adds selected data from Redux store to the component. The data is added on the props of the component.

`mapDispatchToProps = () => {}` - is a function that adds methods for dispatching actions to the component. These dispatch methods added on the props of the component.





`src/components/projectList.js`

```jsx
// components/projects/ProjectList.js

...

import { connect } from 'react-redux';

...

	...


const mapStateToProps = () => {
    return {}
};

const mapDispatchToProps = () => {
    return {};
};


//	connect("adds data from redux store", "creates dispatch methods")(Component)
export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);
```









```jsx
// components/projects/ProjectList.js

...
		...

// ADD PARTS OF REDUX STATE TO THE PROPS
const mapStateToProps = (state) => {
  return {
    projects: state.projects
  }
}

//	CREATE METHODS WITH ACTIONS ON THE PROPS
const mapDispatchToProps = (dispatch) => {
  return {
    addAllProjects: (allProjects) => { 
        dispatch( {type: 'ADD_ALL_PROJECTS', payload: allProjects} ) 
   } 
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);
```









#### Change `getAllProjects` to save the data to the Redux store instead of saving it to the component `state`

```jsx
// components/projects/ProjectList.js

...


  getAllProjects = () => {
    axios.get(`http://localhost:5000/api/projects`).then(response => {
      // this.setState({ listOfProjects: response.data });	 <--- DELETE
      this.props.addAllProjects(response.data);
    });
  };
```







#### Remove the `state` from `ProjectList` and map the data coming from the Redux state via `this.props.projects` which we set in the `mapStateToProps`.

```jsx
// components/projects/ProjectList.js

...
class ProjectList extends Component {
  // state = {
  //   listOfProjects: [],				<--- DELETE
  // };

	...
    	...
  render() {
 // const { listOfProjects } = this.state;     <--- DELETE
    const { projects } = this.props; 		 // <-- ADD
        
    return (
      <div>
        <AddProject updateProjectList={this.getAllProjects} />
        <div>
            
       {/* {listOfProjects &&						<--- DELETE
            listOfProjects.map(project => { */}		<--- DELETE
            
          { projects &&							// <-- ADD
            projects.map(project => {			// <-- ADD
```









#### Let's connect `AddProject` component to Redux and start adding projects to the Redux state after saving them to the DB.





`components/projects/AddProject`

```jsx
//	components/projects/AddProject

...

import { connect } from "react-redux";


...
		...

const mapDispatchToProps = dispatch => {
  return {
    addProject: project => {
      dispatch({ type: 'ADD_PROJECT', payload: project });
    },
  };
};

export default connect(null, mapDispatchToProps)(AddProject);
```







```jsx
//	components/projects/AddProject

...
  

  handleFormSubmit = event => {
    event.preventDefault();
    const { title, description } = this.state;

    axios
      .post(`http://localhost:5000/api/projects`, { title, description })
      .then(() => {
         this.props.addProject({ title, description });
         this.setState(
           { title: '', description: '' },
           this.props.updateProjectList()
        );
      });
  };
```









### We can refactor the code and move our action functions to a separate file



`redux/actions/actions`

```jsx
//	redux/actions/actions

export const addProject = project => ({
  type: 'ADD_PROJECT',
  payload: project,
});

export const addAllProjects = allProjects => ({
  type: 'ADD_ALL_PROJECTS',
  payload: allProjects,
});

```





`components/projects/AddProject.js`

```jsx
// components/projects/AddProject.js

	...
	
import * as actions from './../../redux/actions/actions';

	...
		...

const mapDispatchToProps = dispatch => {
  return {
    addProject: (project) => dispatch(actions.addProject(project)),
  };
};
```





`components/projects/ProjectList.js`

```jsx
// components/projects/ProjectList.js

	...
    
import * as actions from './../../redux/actions/actions';

	...
    	...

const mapDispatchToProps = dispatch => {
  return {
    addAllProjects: (allProjects) =>
      dispatch(actions.addAllProjects(allProjects)),
  };
};

```













#### One way flow of the data:

Redux works on a principle of **one way data flow**

- View (Component) sends an Action to the Dispatcher,
- Dispatcher triggers the reducer with action,
- Reducer takes old state and returns new one,
- Store updates the state with new state,
- Components connected to Redux re-render on `redux state` update/change.





### Task - refactor the existing app to use the Redux store for both Projects and Tasks



Before starting read about the [`combineReducers`](https://redux.js.org/api/combinereducers) method of `redux` and go through the first 10 videos on this [playlist](https://egghead.io/courses/getting-started-with-redux). 
