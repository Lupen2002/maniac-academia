// @flow

export type VKWebAppGetUserInfoResult = {
  id: number,
  first_name: string,
  last_name: string,
  sex: 0|1|2, //1 — женский; 2 — мужской; 0 — пол не указан.
  city: {
    id: number,
    title: string
  },
  country: {
    id: number,
    title: string
  },
  bdate?: string,
  photo_100: string,
  photo_200: string,
  timezone: number
}

export type VkConnectResultGetUserInfoResult = {
  type: "VKWebAppGetUserInfoResult",
  data: VKWebAppGetUserInfoResult
}

export type VkConnectResult = VkConnectResultGetUserInfoResult
export type VkConnectEvent = {
  detail:VkConnectResult
}