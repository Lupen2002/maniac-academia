// @flow

import BEMHelper from "react-bem-helper";

export const bemHelper = (name: string) => {
  return new BEMHelper({
                         name,
                         prefix           : "",
                         modifierDelimiter: "_",
                         outputIsString   : false
                       })
};