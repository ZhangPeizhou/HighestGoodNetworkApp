import { FETCH_BUILDING_MATERIAL_INVENTORY_TYPES } from "constants/bmdashboard/materialsConstants"

const defaultState = {
  result: [],
  error: null,
  success: null
}

export const buildingInventoryTypesReducer = (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_BUILDING_MATERIAL_INVENTORY_TYPES:
      {
        state.result = action.payload;
        state.success = true;
        state.error = false;
        return { ...state };
      }
    default:
      {
        return state;
      }
  }
}

export default buildingInventoryTypesReducer;