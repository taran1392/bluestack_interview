import React from "react";
import { DashBoardStore } from "./dashboardStore";

const RootStore = {dashboard: new DashBoardStore()};
const RootStoreContext = React.createContext(RootStore);

export {
    RootStoreContext
}