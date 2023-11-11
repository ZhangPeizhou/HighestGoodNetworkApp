import axios from "axios";
import { ENDPOINTS } from "utils/URL";
import { SET_PROJECT_DETAIL } from "constants/bmdashboard/projectDetailConstants";
import { GET_ERRORS } from "constants/errors";

export const fetchProjectDetailById = (projectId) => {
  // check that the projectId param from the route has been passed
  console.log(projectId);

  return async dispatch => {
    // pass the projectId arg to the URL
    axios.get(ENDPOINTS.BM_PROJECT_DETAIL(projectId))
    .then(res => {
      console.log("Data from actions is",res.data);
      // dispatch the data object to the reducer function
      dispatch(setProjectDetail(res.data))
    })
    .catch(err => {
      // dispatch the error object to the reducer function
      dispatch(setErrors(err))
    })
  } 
}

export const setProjectDetail = payload => {
  return {
    type: SET_PROJECT_DETAIL,
    payload
  }
}

export const setErrors = payload => {
  return { 
    type: GET_ERRORS,
    payload
  }
}