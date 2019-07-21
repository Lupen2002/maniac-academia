// @flow


import type { Action }                  from "../actions";
import { createActions, handleActions } from "redux-actions";

type UserState = {
  user?: any
}

const defaultState = {};

const options = {
  prefix   : 'user',
  namespace: '_'
};


export const userReducer = handleActions(
  new Map([
            [
              userActions.SET_PROFILES,
              (state: UserState, action: Action) => ({...state, user: action.payload})
            ]
          ])
);