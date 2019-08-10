// @flow
import "./styles.scss";

import * as React from "react";
import { Panel, Group, CellButton, List, Cell } from "@vkontakte/vkui";
import type {
  VKConnectResultAccessToken,
  VkConnectResultGetUserInfoResult,
  VKWebAppGetUserInfoResult
} from "../../../types/vk";
import { isAdmin } from "../../../utils/admin";
import { bemHelper } from "../../../utils";
import AppHeader from "../components/header/AppHeader";
import { useEffect, useState } from "react";
import { getEvents, makeFlowEvents } from "./utils";
import connect from "@vkontakte/vkui-connect-promise";
import PanelSpinner from "@vkontakte/vkui/dist/components/PanelSpinner/PanelSpinner";
import Icon24Add from "@vkontakte/icons/dist/24/add";
import { useDispatch, useSelector } from "react-redux";
import type { Dispatch } from "redux";
import type { Action } from "../../../redux/actions";
import { appActions } from "../../../redux/actions";
import type { AppState } from "../../../redux/reducers";

const bem = bemHelper("event-flow");

type Props = {
  id: string,
  go: string => any
};

const EventFlow = (p: Props) => {
  const [events, setEvents] = useState([]),
    [user, setUser] = useState<?VKWebAppGetUserInfoResult>(null),
    [loading, setLoading] = useState(true);
  const token = useSelector<AppState, ?string>(state => state.user.token);
  const dispatch: Dispatch<Action> = useDispatch();
  const flowEvents = makeFlowEvents(events);

  const updateEvents = async () => {
    setLoading(true);
    const res = await getEvents();
    setEvents(res);
    setLoading(false);
  };

  const updateToken = async () => {
    if (!token) {
      setLoading(true);
      const userRes: VkConnectResultGetUserInfoResult = await connect.send(
          "VKWebAppGetUserInfo",
          {}
        ),
        tokenRes: VKConnectResultAccessToken = await connect.send(
          "VKWebAppGetAuthToken",
          {
            app_id: 7062331,
            scope: "groups,stats"
          }
        );

      setUser(userRes.data);
      dispatch(appActions.user.setToken(tokenRes.data.access_token));
      setLoading(false);
    }
  };

  useEffect(() => {
    updateToken().catch(console.error);
  }, [user, token]);

  useEffect(() => {
    updateEvents()
      .then()
      .catch(console.error);
  }, []);

  return (
    <>
      <Panel id={p.id} centered={!user} {...bem()}>
        <AppHeader active={p.id} isAdmin={isAdmin(user)} go={p.go}>
          Расписание
        </AppHeader>
        {loading && <PanelSpinner />}
        {!loading && isAdmin(user) && (
          <Group>
            <CellButton
              onClick={() => p.go("add-events-admin")}
              before={<Icon24Add />}
            >
              Добавить новое событие
            </CellButton>
          </Group>
        )}
        {!loading &&
          flowEvents.map(([day, flow], i) => (
            <Group
              key={`event-flow-group-${i}`}
              title={day.toLocaleDateString("ru-RU", {
                weekday: "short",
                year: undefined,
                month: "short",
                day: "numeric"
              })}
            >
              <List>
                {flow.map(e => (
                  <Cell
                    key={`event-flow-${e._id}`}
                    expandable
                    description={`начало в ${e.time}`}
                  >
                    <b>{e.name}</b>
                  </Cell>
                ))}
              </List>
            </Group>
          ))}
      </Panel>
    </>
  );
};

export default EventFlow;
