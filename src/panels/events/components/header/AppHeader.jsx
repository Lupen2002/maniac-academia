// @flow
import "./styles.scss";

import * as React from "react";
import {
  Cell,
  HeaderContext,
  List,
  PanelHeader,
  PanelHeaderContent
} from "@vkontakte/vkui";
import Icon16Dropdown from "@vkontakte/icons/dist/16/dropdown";
import Icon24Done from "@vkontakte/icons/dist/24/done";
import { bemHelper } from "../../../../utils";
import { useState } from "react";
import AppHeaderIcon from "./AppHeaderIcon";

const bem = bemHelper("app-header");

type Props = {
  active: string,
  children?: React.Node,
  isAdmin?: boolean,
  go: string => any
};

const AppHeader = (p: Props) => {
  const [isOpenHeadContext, setOpenHeadContext] = useState(false);

  return (
    <>
      <PanelHeader>
        {p.isAdmin ? (
          <PanelHeaderContent
            aside={<Icon16Dropdown />}
            onClick={() => setOpenHeadContext(!isOpenHeadContext)}
          >
            {p.children}
          </PanelHeaderContent>
        ) : (
          p.children
        )}
      </PanelHeader>
      {p.isAdmin && (
        <HeaderContext opened={isOpenHeadContext} onClose={() => {}}>
          <List>
            <Cell
              onClick={() => p.go("events-feed")}
              asideContent={
                p.active === "events-feed" ? (
                  <Icon24Done fill="var(--accent)" />
                ) : null
              }
              before={<AppHeaderIcon bem={bem} icon="rss" />}
            >
              Расписание
            </Cell>
            <Cell
              onClick={() => p.go("events-admin")}
              before={<AppHeaderIcon bem={bem} icon="user-cog" />}
              asideContent={
                p.active === "events-admin" ? (
                  <Icon24Done fill="var(--accent)" />
                ) : null
              }
            >
              Администрирование
            </Cell>
          </List>
        </HeaderContext>
      )}
    </>
  );
};

export default AppHeader;
