import { SWITCH_TAB, TEST } from "./constants";

export type ISwitchTab  = {
	readonly type: typeof SWITCH_TAB
	currenttab: string
}


export interface ITEST {
	readonly type: typeof TEST;
}

export type TSwitchTabActions = 
	| ISwitchTab
	| ITEST



export const switchTab = (curr: string): ISwitchTab => ({
	type: SWITCH_TAB,
	currenttab: curr
})