// @flow

import * as React from "react";
import { useState, useEffect } from "react";
import connect from "@vkontakte/vkui-connect";
import { Epic, View } from "@vkontakte/vkui";
import { Panel, PanelHeader } from "@vkontakte/vkui";

import type { VkConnectEvent, VKWebAppGetUserInfoResult } from "./types/vk";
import EventFlow                                          from "./panels/events/event-flow/EventFlow";
import EventsAdmin                                        from "./panels/events/admin/list/EventsAdmin";
import AppTabbar                                          from "./companents/menu/AppTabbar";
import AddEventsAdmin                                     from "./panels/events/admin/add/AddEventsAdmin";

type Props = {};

const App = (p: Props) => {
  const [activePanel, setActivePanel] = useState("events-feed");
  const [activeStory, setActiveStory] = useState("events");
  const [currentUser, setCurrentUser] = useState<?VKWebAppGetUserInfoResult>(
    null
  );
  const [token, setToken] = useState<?string>(null);

  useEffect(() => {
    connect.subscribe((e: VkConnectEvent) => {
      switch (e.detail.type) {
        case "VKWebAppGetUserInfoResult":
          setCurrentUser(e.detail.data);
          break;
        case "VKWebAppAccessTokenReceived":
          setToken(e.detail.data.access_token);
          break;
        default:
        //console.log(e);
      }
    });
    connect.send("VKWebAppGetUserInfo", {});
  }, []);

  return (
    <Epic
      activeStory={activeStory}
      tabbar={<AppTabbar active={activeStory} go={setActiveStory} />}
    >
      <View id="events" activePanel={activePanel}>
        <EventFlow id="events-feed" user={currentUser} go={setActivePanel} />
        <EventsAdmin id="events-admin" token={token} user={currentUser} go={setActivePanel} />
        <AddEventsAdmin id="add-events-admin" token={token} user={currentUser} go={setActivePanel} />
      </View>
      <View id="user" activePanel="user-main">
        <Panel id="user-main">
          <PanelHeader>Кабинет</PanelHeader>
        </Panel>
      </View>
    </Epic>
  );
};

export default App;
