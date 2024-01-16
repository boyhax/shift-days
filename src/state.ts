import { DateObject } from "react-multi-date-picker";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface State {
  settingOpen: boolean;
  workdays: string[];
  offdayscount: number;
  workdayscount: number;
  shiftstart:any
}

export const state = create<State>()(
  devtools(
    persist(
      (set) => ({
        settingOpen: false,
        workdays: [],
        offdayscount: 14,
        workdayscount: 14,
        shiftstart:new DateObject()
      }),
      { name: "statestore" }
    )
  )
);
state.setState({settingOpen:false})