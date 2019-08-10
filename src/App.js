// @flow

import * as React from "react";
import { useState } from "react";
import { Epic, View } from "@vkontakte/vkui";
import { Panel, PanelHeader } from "@vkontakte/vkui";

import EventFlow from "./panels/events/event-flow/EventFlow";
import AppTabbar from "./companents/menu/AppTabbar";
import AddEventsAdmin from "./panels/events/admin/add/AddEventsAdmin";

const App = () => {
  const [activePanel, setActivePanel] = useState("events-feed");
  const [activeStory, setActiveStory] = useState("events");

  return (
    <Epic
      activeStory={activeStory}
      tabbar={<AppTabbar active={activeStory} go={setActiveStory} />}
    >
      <View id="events" activePanel={activePanel}>
        <EventFlow id="events-feed" go={setActivePanel} />
        <AddEventsAdmin id="add-events-admin" go={setActivePanel} />
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
