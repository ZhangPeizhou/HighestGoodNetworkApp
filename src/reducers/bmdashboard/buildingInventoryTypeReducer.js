import { FETCH_BUILDING_MATERIAL_INVENTORY_TYPES, POST_BUILDING_MATERIAL_INVENTORY_TYPE, RESET_POST_BUILDING_MATERIAL_INVENTORY_TYPE } from "constants/bmdashboard/materialsConstants"

const defaultState = {
  fetchedResult: {
    result: [],
    error: null,
    success: null
  },
  postedResult: {
    result: null,
    error: null,
    success: null
  }
}

export const buildingInventoryTypesReducer = (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_BUILDING_MATERIAL_INVENTORY_TYPES:
      return {
        ...state,
        fetchedResult: {
          result: action.payload,
          success: true,
          error: false
        }
      };
    case POST_BUILDING_MATERIAL_INVENTORY_TYPE:
      return {
        ...state,
        postedResult: {
          result: action.payload,
          success: true,
          error: false
        }
      };
    case RESET_POST_BUILDING_MATERIAL_INVENTORY_TYPE:
      return {
        ...state,
        postedResult: {
          result: null,
          success: null,
          error: null
        }
      }
    default:
      {
        return state;
      }
  }
}
