// @flow
import "./styles.scss";

import * as React                                    from "react";
import { Panel, Group, Div, CellButton, List, Cell } from "@vkontakte/vkui";
import type { VKWebAppGetUserInfoResult }            from "../../../types/vk";
import Stub                                          from "../components/stub/Stub";
import { isAdmin }                                   from "../../../utils/admin";
import { bemHelper }                                 from "../../../utils";
import AppHeader                                     from "../components/header/AppHeader";
import { useEffect, useState }                       from "react";
import { getEvents }                                 from "./utils";
import connect                                 from "@vkontakte/vkui-connect-promise";
import PanelSpinner            from "@vkontakte/vkui/dist/components/PanelSpinner/PanelSpinner";
import Icon24Add               from "@vkontakte/icons/dist/24/add";

const bem = bemHelper("event-flow");

type Props = {
  id: string,
  user: ?VKWebAppGetUserInfoResult,
  token: ?string,
  go: string => any
};

const EventFlow = (p: Props) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const updateEvents = async () => {
    const res = await getEvents();
    setEvents(res);
    setLoading(false)
  };

  useEffect(() => {
    p.user &&
      !p.token &&
      connect.send("VKWebAppGetAuthToken", {
        app_id: 7062331,
        scope: "groups,stats"
      });
    p.user && p.token && setLoading(false)
  }, [p.user, p.token]);

  useEffect(() => {
    setLoading(true);
    updateEvents()
      .then()
      .catch(console.error);
  }, []);
  return (
    <>
      <Panel id={p.id} centered={!p.user}>
        <AppHeader active={p.id} isAdmin={isAdmin(p.user)} go={p.go}>
          Расписание
        </AppHeader>
        {loading && <PanelSpinner />}
        {!loading && isAdmin(p.user) && (
          <Group>
            <CellButton
              onClick={() => p.go("add-events-admin")}
              before={<Icon24Add />}
            >
              Добавить новое событие
            </CellButton>
          </Group>
        )}
        {!loading && (
          <Group>
            <List>
              {events.map(e => (
                <Cell key={`event-${e._id}`} expandable><b>{e.name}</b> начало в {e.time}</Cell>
              ))}
            </List>
          </Group>
        )}
      </Panel>
    </>
  );
};

export default EventFlow;
