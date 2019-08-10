// @flow

import { createAction } from "redux-actions";

export const USER_SET_TOKEN = 'USER_SET_TOKEN';

export type UserSetToken = {
  type: 'USER_SET_TOKEN',
  payload: string
}

export type UserActions = UserSetToken

export type UserActionsType = {
  setToken: string => UserSetToken
}

export const userActions: UserActionsType = {
  setToken: createAction(USER_SET_TOKEN)
};