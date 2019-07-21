// @flow

import './styles.scss'

import * as React               from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { bemHelper }       from "../../../../utils";

const bem = bemHelper("stub");


const Stub = () => {
  return (
    <div {...bem()}>
      <FontAwesomeIcon {...bem("spinner")} icon="circle-notch" spin size="4x" />
    </div>
  );
};

export default Stub;
