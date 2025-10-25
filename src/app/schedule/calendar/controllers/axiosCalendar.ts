import axios from "@/lib/axios";

const URL = "/schedule/calendar/api";

export async function getCalendar() {
  const res = await axios.get(URL);
  return res.data;
}
