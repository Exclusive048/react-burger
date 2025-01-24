import { SWITCH_TAB } from "../actions/constants";
import { selectTabReducer, initialState } from "./tabs";

describe("selectTab reducer", () => {
  it("should return the initial state", () => {
    expect(selectTabReducer(undefined, {})).toEqual(initialState);
  });

  it("should change currenttab", () => {
    expect(
      selectTabReducer(initialState, {
        type: SWITCH_TAB,
        currenttab: "main",
      })
    ).toEqual({
      ...initialState,
      currenttab: "main",
    });
  });
});
