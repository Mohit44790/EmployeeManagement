// src/redux/rootReducer.js
import { combineReducers } from "@reduxjs/toolkit";
import employeeReducer from "./slice/employeeSlice";

const rootReducer = combineReducers({
  employee: employeeReducer,
});



export default rootReducer;
