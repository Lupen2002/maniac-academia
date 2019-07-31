// @flow

import connect                  from '@vkontakte/vkui-connect-promise';
import { lwzEncode, lzwDecode } from "../../../../utils/lwz";

export const storageGetEvent = async (access_token: string): Promise<string> => {
  const res = await connect.send("VKWebAppCallAPIMethod", {
    method: "storage.get",
    request_id: "EVENTS",
    params: {
      key: "events",
      global: 1,
      v:"5.101",
      access_token
    }
  });
  try{
    return JSON.parse(lzwDecode(res.data.response));
  } catch {
    return []
  }
};

export const storageSetEvent = async (events: any, access_token: string): Promise<void> => {
  await connect.send("VKWebAppCallAPIMethod", {
    method: "storage.set",
    request_id: "EVENTS",
    params: {
      key: "events",
      global: 1,
      v:"5.101",
      value: lwzEncode(JSON.stringify(events)),
      access_token
    }
  })
};