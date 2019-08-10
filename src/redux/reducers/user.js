// @flow

import type { Action }    from "../actions";
import { USER_SET_TOKEN } from "../actions/user";

export type UserState = {
  token?: string
};

const defaultState = {};

export const userReducer = (
  state: UserState = defaultState,
  action?: Action
) => {
  if (action && action.type) {
    switch (action.type) {
      case USER_SET_TOKEN:
        return { ...state, token: action.payload };
      default: return state;
    }
  } else {
    return state
  }
};
