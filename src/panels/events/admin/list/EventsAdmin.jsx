// @flow

import * as React from "react";
import { useEffect, useState } from "react";
import { bemHelper } from "../../../../utils";
import type { VKWebAppGetUserInfoResult } from "../../../../types/vk";
import { Panel, Group, CellButton, Div } from "@vkontakte/vkui";
import { List, Cell } from "@vkontakte/vkui";
import { isAdmin } from "../../../../utils/admin";
import AppHeader from "../../components/header/AppHeader";
import Icon24Add from "@vkontakte/icons/dist/24/add";
import connect from "@vkontakte/vkui-connect";
import { storageGetEvent, storageSetEvent } from "../utils/api";
import { getEvents } from "./utils";
import PanelSpinner from '@vkontakte/vkui/dist/components/PanelSpinner/PanelSpinner';

const bem = bemHelper("admin-main");

type Props = {
  id: string,
  user: ?VKWebAppGetUserInfoResult,
  token: ?string,
  go: string => any
};

const EventsAdmin = (p: Props) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const updateEvents = async () => {
    const res = await getEvents();
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
    setLoading(true);
    updateEvents()
      .then(() => setLoading(false))
      .catch(console.error);
  }, []);

  return (
    <Panel id={p.id}>
      <AppHeader active={p.id} isAdmin={isAdmin(p.user)} go={p.go}>
        События-Настройки
      </AppHeader>
      {loading && <PanelSpinner />}
      {!loading && (
        <>
          <Group>
            <CellButton
              onClick={() => p.go("add-events-admin")}
              before={<Icon24Add />}
            >
              Добавить новое событие
            </CellButton>
          </Group>
          <Group>
            <List>
              {events.map(e => (
                <Cell key={`event-${e._id}`} expandable><b>{e.name}</b> начало в {e.time}</Cell>
              ))}
            </List>
          </Group>
        </>
      )}
    </Panel>
  );
};

export default EventsAdmin;
