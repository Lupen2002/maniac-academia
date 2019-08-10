// @flow

import { createStore }   from "redux";
import type { Dispatch } from "redux";
import reducers          from "./reducers";
import type { AppState } from "./reducers";
import type { Action }   from "./actions";

export const store = createStore<AppState, Action, Dispatch<Action>>(
  reducers,
  undefined
);
