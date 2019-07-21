// @flow
import "./styles.scss";

import * as React                         from "react";
import { Panel, Group, Div }              from "@vkontakte/vkui";
import type { VKWebAppGetUserInfoResult } from "../../../types/vk";
import Stub                               from "../components/stub/Stub";
import { isAdmin }                        from "../../../utils/admin";
import { bemHelper }                      from "../../../utils";
import AppHeader                          from "../components/header/AppHeader";

const bem = bemHelper("event-flow");

type Props = {
  id: string,
  user: ?VKWebAppGetUserInfoResult,
  go: string => any
};

const EventFlow = (p: Props) => {

  return (
    <>
      <Panel id={p.id} centered={!p.user}>
        <AppHeader active={p.id} isAdmin={isAdmin(p.user)}  go={p.go}>
          Расписание
        </AppHeader>
        {!p.user && <Stub />}
        {isAdmin(p.user) && (
          <Group>
            <Div>Admin</Div>
          </Group>
        )}
        {p.user && !isAdmin(p.user) && (
          <Group>
            <Div>User</Div>
          </Group>
        )}
      </Panel>
    </>
  );
};

export default EventFlow;
