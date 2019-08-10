// @flow

import type { UserActions, UserActionsType } from "./user";
import { userActions }                       from "./user";

export type Action = UserActions

export type ActionsType = {
  user: UserActionsType
}

export const appActions = {
  user: userActions
};