// @flow

import * as React             from "react";
import { TabbarItem, Tabbar } from "@vkontakte/vkui";
import NewsfeedIcon           from "@vkontakte/icons/dist/28/newsfeed";
import UserIcon               from "@vkontakte/icons/dist/28/user.js";

type Props = {
  active: string,
  go: string => any
}

const AppTabbar = (p: Props) => {
  return (
    <Tabbar>
      <TabbarItem
        onClick={() => p.go('events')}
        selected={p.active === 'events'}
        data-story="events"
        text="События"
      >
        <NewsfeedIcon />
      </TabbarItem>
      <TabbarItem
        onClick={() => p.go('user')}
        selected={p.active === 'user'}
        data-story="users"
        text="Личный кабинет"
      >
        <UserIcon />
      </TabbarItem>
    </Tabbar>
  );
};

export default AppTabbar