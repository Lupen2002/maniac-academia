// @flow

import * as React from "react";
import { bemHelper } from "../../../utils";
import type { VKWebAppGetUserInfoResult } from "../../../types/vk";
import { Panel, Group, CellButton } from "@vkontakte/vkui";
import { isAdmin } from "../../../utils/admin";
import AppHeader from "../components/header/AppHeader";
import Icon24Add from "@vkontakte/icons/dist/24/add";
import connect from "@vkontakte/vkui-connect";

const bem = bemHelper("admin-main");

type Props = {
  id: string,
  user: ?VKWebAppGetUserInfoResult,
  go: string => any
};

const EventsAdmin = (p: Props) => {
  p.user && connect.send("VKWebAppGetAuthToken", {"app_id": 7062331, "scope": "groups,stats"});
  connect.subscribe("VKWebAppAccessTokenReceived", (e: any) => {

  });
  return (
    <Panel id={p.id}>
      <AppHeader active={p.id} isAdmin={isAdmin(p.user)} go={p.go}>
        События-Настройки
      </AppHeader>
      <Group>
        <CellButton before={<Icon24Add />}>Добавить новое событие</CellButton>
      </Group>
    </Panel>
  );
};

export default EventsAdmin;
