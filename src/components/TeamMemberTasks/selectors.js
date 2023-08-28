const getTeamMemberTasksData = state => ({
  isLoading: state.teamMemberTasks.isLoading,
  usersWithTasks: state.teamMemberTasks.usersWithTasks,
});

export default getTeamMemberTasksData;
