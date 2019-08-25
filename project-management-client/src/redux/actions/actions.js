//	redux/actions/actions

export const addProject = project => ({
  type: 'ADD_PROJECT',
  payload: project,
});

export const addAllProjects = allProjects => ({
  type: 'ADD_ALL_PROJECTS',
  payload: allProjects,
});
