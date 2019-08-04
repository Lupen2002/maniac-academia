// @flow

import axios from "axios";

const baseUrl = 'http://45.86.180.13:3000';

export async function postEvents(event: any) {
  return await axios.post(baseUrl + '/events', event)
}