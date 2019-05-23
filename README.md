# Redux





### Clone the starter repository and checkout to the branch `starter-code`



```bash
git clone https://github.com/ross-u/Redux-Code-Example-.git

cd Redux-Code-Example

# Switch to the branch `starter-code`
git checkout starter-code

# Install dependencies in `project-management-server`
cd project-management-server

npm i

cd ..

# Install dependencies in `project-management-client`
cd project-management-client

npm i
```





#### Install Redux dependencies

```bash
# In the `project-management-client` directory
npm i redux react-redux --save
```







#### Redux is a state management library.

#### `react-redux` is the binding library to bind React and Redux together.

<br>
<br>


#### Redux provides a one way flow of the data:

- Dispatch action to store, 
- store triggers the reducer with that action,
- Reducer runs and updates the store state,
- app re-renders on state update/change


<br>


# Redux introduction

<br>


### In `App.js` we will create a Redux `store` object 

<br>

```jsx
//	src/App.js

// IMPORT REDUX
import { createStore } from "redux";

// REDUCER
//	...

// CREATE REDUX STORE
const store = createStore(/* Store must take a Reducer function*/);
```

<br>


#### What is a store?

<br>

##### We can think of a `store` as an empty space, assigned to Redux. It is essentially an object.

<br>


#### What is a reducer ?


<br>


##### Reducer is a function that we create.

##### Reducer is a function that creates the initial/starting state in the store.

##### The only way to perform some actions in the Redux store is through reducer.

##### Reducer is the only function that can change the state data inside of the Redux store.

##### We have to pass the reducer function or combined reducers to `createStore()`.


<br>


#### Create a reducer and pass it to the store

<br>

```jsx
//	src/App.js

// REDUCER
const reducer = (state = { name: 'Test'} , action) => {
  console.log('Initialization action -> ', action);
  console.log('state -> ', state);
}

// CREATE THE STORE						We have to put the reducer in the store
const store = createStore(reducer);

// If we log this in browser we will see that reducer initializes the state, as soon as app is run.
```

<br>


#### We usually specify the structure of initial state by passing a variable as a default parameter value.

```jsx
//	src/App.js

// INITIAL STATE OF THE STORE							<--- Create above before the reducer
const initialState = []

// REDUCER
const reducer = (state = initialState , action) => {
  console.log('Initialization action -> ', action);
  console.log('state -> ', state);
}
```

<br>

#### To start changing that state with the reducer, we have to give the reducer a command.

#### We call this command - an action, and it looks like an object.



#### Action is given to the reducer via `store.dispatch`  function. This is how we give the action to the reducer.


<br>



```jsx
//	src/App.js

// ACTION - is command/object with `type` property, given to the Reducer as a task.
// action can also include data to be placed in the store state.
const action1 = { type: 'ADD_PROJECT', data: 'My new project'};

// DISPATCHING THE TASK / ACTION TO THE REDUCER
store.dispatch(action1);
```

<br>

#### We can now modify the reducer, and specify what to do on each action.

<br>


```jsx
//	src/App.js

//	REDUCER
const reducer = (state = initialState, action) => {
  switch(action.type) {   // The action type string
    case 'ADD_PROJECT':
      return [...state, action.data ];
    
      default:
      return state;
  }
}
```

<br>


#### We then subscribe to listen to any changes of the Redux store.

<br>

```jsx
//	src/App.js


//  SUBSCRIBE TO CHANGES IN STATE						<---		Subscribe before the dispatch
store.subscribe( ()=> {
  console.log('State changed');
  console.log( store.getState() );
})

// DISPATCHING THE TASK / ACTION TO THE REDUCER
store.dispatch(action1);
```

<br>


# Redux - creating  store for the Reactapp and connecting components to

<br>


#### Let's create another `App.js` and now do the proper setup of Redux, not just an example.

<br>


#### Create folders `src/redux` and `src/redux/reducers` and file :

#### -  `redux/reducers/projectReducer.js`


<br>


#### Provide Redux store to the entire app - in `index.js`


<br>


```jsx
//	src/index.js

...
...

import { createStore } from 'redux';
import { Provider } from 'react-redux'
import projectReducer from './redux/projectReducer';

const store = createStore(
  projectReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render((
<Provider store={store}>			//			<---- Wrap the app with store Provider
    <Router> 
        <App />
    </Router> 
</Provider>										//			<---- Wrap the app with store Provider
), document.getElementById('root'));
```

<br>


#### Let's Update the `projectReducer.js` file, create a reducer function and export it.

```jsx
//	redux/reducers/projectReducers.js


const initialState = {
  projects: []
};

const projectReducer = (state = initialState, action) => {
  return state;
}

export default projectReducer;
```

<br>


#### We can now use Redux  DevTools to see the state in our Chrome Dev console.

<br>


### Let's give functionality to the reducer



```jsx
//	redux/reducers/projectReducers.js

...

//  ACTION  -   { type: 'ADD_PROJECT', data: {............}  }

const projectReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'ADD_PROJECT':
      return { ...state, projects: [...state.projects, action.data]}
    
    case 'ADD_ALL_PROJECTS':
      return { ...state, projects: [...action.data] }
    
    default:
      return state;
  }
}

export default projectReducer;
```









#### Using a `connect` HOC from Redux we will connect our component to Redux state



`src/components/projectList.js`

```jsx
// components/projects/ProjectList.js

...

import { connect } from 'react-redux';

...

	...

export default connect()(ProjectList);
```





<br>



 In order to get data from Redux store we have to <u>save Redux state into props</u>





```jsx
// components/projects/ProjectList.js

...
		...

//	HERE WE GET DATA FROM REDUX STATE AND MAKE IT AVAILABLE ON THE PROPS
const mapStateToProps = (state) => {
  return {
    projects: state.projects
  }
}

//	HERE WE CREATE FUNCTIONS ON THE PROPS THAT WILL DISPATCH ACTION AND PAYLOAD TO REDUX
const mapDispatchToProps = (dispatch) => {
  return {
    addAllProjects: (allProjects) => { dispatch( {type: 'ADD_ALL_PROJECTS', data: allProjects} ) },
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);
```









#### To understand it a bit more, let's remove the axios request from `ProjectsList`



##### and create a file with data `src/data.js`



`src/data.js`

```js
//	src/data.js

const data =[
  {
    _id:"5ce45027819d8027bbb32120",
    title:"Project 1", description: "Project 1 Description",
    tasks:[
      {_id:"5ce4504c819d8027bbb32124", title:"Task 1 ", description: "Task description", project:"5ce45027819d8027bbb32121"}
    ]
  },
  {
    _id:"5ce45027819d8027ccc32121",
    title:"Project 2", description: "Project 2 Description",
    tasks:[]
  },
]

export default data;
```



#### We will remove axios request, we will work only with Redux for our example.

 

`components/projects/ProjectList`

```jsx
// components/projects/ProjectList.js

...

import dataArray from './../../data'

...


getAllProjects = () => {
    this.props.addAllProjects(dataArray)
    // axios.get(`http://localhost:5000/api/projects`)
    // .then((apiResponse) => {
      // this.setState({ listOfProjects: apiResponse.data })
    // })
  }

```







#### Let's connect `AddProject` component to Redux. We will then be adding projects to the redux state.





`components/projects/AddProject`

```jsx
//	components/projects/AddProject

...

import { connect } from "react-redux";


...
		...

const mapStateToProps = (state) => {
  return {
    projects: state.projects
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addProject: (project) => dispatch( {type: 'ADD_PROJECT', data: project } )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProject);
```







```jsx
//	components/projects/AddProject

...
  

	handleFormSubmit = (event) => {
    event.preventDefault();
    const {title, description } = this.state;

    this.props.addProject({ title, description });
 // axios.post("http://localhost:5000/api/projects", { title, description })
 //   .then( () => {
 //     this.props.getData();
 //     this.setState({title: "", description: ""});
 //   })
 //   .catch( (err) => console.log(err) )
  }

```

