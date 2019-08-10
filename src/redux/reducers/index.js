// @flow

import { combineReducers } from "redux";
import { userReducer }     from "./user";
import type { Action }     from "../actions";
import type { UserState }  from "./user";

export type AppState = {
  user: UserState
}

const reducers = {
  user: userReducer
};

export default combineReducers<typeof reducers, Action>(reducers)