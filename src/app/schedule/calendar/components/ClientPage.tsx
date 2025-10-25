"use client";

import { useEffect, useState } from "react";
import { getCalendar } from "../controllers/axiosCalendar";

export default function CalendarPage() {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getCalendar();
        setEvents(data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">내 구글 캘린더 일정</h1>
      {events.length === 0 ? (
        <p>일정이 없습니다.</p>
      ) : (
        <ul className="space-y-3">
          {events.map((event) => (
            <li
              key={event.id}
              className="p-4 border rounded-md shadow-sm bg-white/70 backdrop-blur-sm"
            >
              <p className="font-semibold">{event.summary}</p>
              <p className="text-sm text-gray-600">
                {event.start?.dateTime || event.start?.date} ~{" "}
                {event.end?.dateTime || event.end?.date}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
