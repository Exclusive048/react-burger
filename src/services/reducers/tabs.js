import { SWITCH_TAB } from "../actions/tabs";

const initialState = {
  currentTab: "bun",
};

export function selectTabReducer(state = initialState, action) {
  switch (action.type) {
    case SWITCH_TAB:
      return { ...state, currentTab: action.currentTab };
    default:
      return state;
  }
}
