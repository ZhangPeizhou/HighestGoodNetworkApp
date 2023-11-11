import { SET_PROJECT_DETAIL } from "constants/bmdashboard/projectDetailConstants"

const defaultState = []

export const projectDetailReducer = (projectId = defaultState, action) => {
    if(action.type === SET_PROJECT_DETAIL) {
      return action.payload
    }
    return projectId
  }