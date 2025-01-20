import { SWITCH_TAB } from "../actions/constants";
import { TSwitchTabActions } from "../actions/tabs";


type TSwitchTabState = {
    currenttab: string
}

export const initialState: TSwitchTabState = {
    currenttab: 'bun'
}

export const selectTabReducer = (state = initialState, action: TSwitchTabActions ) => {
    switch (action.type) {
        case SWITCH_TAB:
            return { ...state, currenttab: action.currenttab };
        default:
            return state;
    }
}