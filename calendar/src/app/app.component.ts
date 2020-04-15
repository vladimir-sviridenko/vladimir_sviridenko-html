import Calendar from "./calendar/calendar.component";

const appTag = "app-calendar";

export default function Init() {
  customElements.define(appTag, Calendar, { extends: "time" });
  return appTag;
}