// @flow
import axios from "axios";

const baseUrl = "http://45.86.180.13:3000";

export async function getEvents() {
  return (await axios.get(baseUrl + "/events")).data;
}

export function incrementDate(date: Date, count: number): Date {
  const ms = count * 60 * 60 * 24 * 1000;
  const out = new Date();
  out.setTime(date.getTime() + ms);
  return out;
}

export function makeFlowEvents(events: Array<any>): Array<Array<any>> {
  const now = new Date();
  const out: Array<Array<any>> = [];
  const filter = (day: number) => (e: any) => e.days.find(d => d === day);
  const map = (date: Date) => (e: any) => ({ ...e, date });

  for (let i = 0; i < 14; i++) {
    const day = incrementDate(now, i);
    const filtered: Array<any> = events.filter(filter(day.getDay()));
    const currentEvents: Array<any> = filtered.map(map(day));
    currentEvents.length > 0 && out.push([day, currentEvents]);
  }
  return out;
}
