// @flow

import * as React                         from "react";
import { useEffect, useState }            from "react";
import { bemHelper }                        from "../../../utils";
import type { VKWebAppGetUserInfoResult }   from "../../../types/vk";
import { Panel, Group, CellButton, Div }    from "@vkontakte/vkui";
import { isAdmin }                          from "../../../utils/admin";
import AppHeader                            from "../components/header/AppHeader";
import Icon24Add                            from "@vkontakte/icons/dist/24/add";
import connect                              from "@vkontakte/vkui-connect";
import { storageGetEvent, storageSetEvent } from "./utils/api";

const bem = bemHelper("admin-main");

type Props = {
  id: string,
  user: ?VKWebAppGetUserInfoResult,
  token: ?string,
  go: string => any
};

const EventsAdmin = (p: Props) => {
  const [events, setEvents] = React.useState([]);

  const updateEvents = async () => {
    if (!p.token) throw Error('token is required!');
    const res = await storageGetEvent(p.token);
    setEvents(res);
  };

  useEffect(() => {
    p.user &&
      !p.token &&
      connect.send("VKWebAppGetAuthToken", {
        app_id: 7062331,
        scope: "groups,stats"
      });
  }, [p.user, p.token]);

  useEffect(() => {
    if (p.token) {
      updateEvents();
    }
  }, [p.token]);

  return (
    <Panel id={p.id}>
      <AppHeader active={p.id} isAdmin={isAdmin(p.user)} go={p.go}>
        События-Настройки
      </AppHeader>
      <Group>
        <CellButton onClick={() => p.go('add-events-admin')} before={<Icon24Add />}>
          Добавить новое событие
        </CellButton>
      </Group>
      {/*<Group>
        <Div>{p.token}</Div>
      </Group>*/}
      <Group>
        <Div>{JSON.stringify(events)}</Div>
      </Group>
    </Panel>
  );
};

export default EventsAdmin;
