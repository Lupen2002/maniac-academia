// @flow

import * as React          from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BEMHelper           from "react-bem-helper";
import { IconProp }        from "@fortawesome/fontawesome-svg-core";

type Props = {
  icon: IconProp,
  bem?: BEMHelper
};

const AppHeaderIcon = (p: Props) => {
  const props = !!p.bem ? p.bem("header-context-menu-icon", "", "Icon") : {};
  return (
    <span {...props}>
      <FontAwesomeIcon icon={p.icon} />
    </span>
  );
};

export default AppHeaderIcon;
