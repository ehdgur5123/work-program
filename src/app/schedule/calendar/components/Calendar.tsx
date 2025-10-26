"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import koLocale from "@fullcalendar/core/locales/ko";
import { useSession } from "next-auth/react";

import "../css/calendar.css";

interface CalendarProps {
  height: number;
}

export default function Calendar({ height }: CalendarProps) {
  const { data: session } = useSession();

  if (!session?.accessToken) return <p>로그인이 필요합니다.</p>;

  return (
    <div className="p-4 text-sm">
      <FullCalendar
        height={height}
        plugins={[dayGridPlugin, googleCalendarPlugin]}
        initialView="dayGridMonth"
        locale={koLocale}
        googleCalendarApiKey={process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY}
        dayCellDidMount={(arg) => {
          const day = arg.date.getDay();
          const numberEl = arg.el.querySelector(".fc-daygrid-day-number");
          if (!numberEl) return;

          if (day === 0)
            (numberEl as HTMLElement).classList.add("text-red-600"); // 일요일
          if (day === 6)
            (numberEl as HTMLElement).classList.add("text-blue-600"); // 토요일
        }}
        eventSources={[
          {
            googleCalendarId: "primary",
            className: "personal-event",
            id: "personal-event",
            extraParams: { access_token: session.accessToken },
          },
          {
            googleCalendarId:
              "ko.south_korea#holiday@group.v.calendar.google.com",
            id: "holiday-event",
            className: "holiday-event", // ← 추가
            extraParams: { access_token: session.accessToken },
            // backgroundColor: "red",
            // borderColor: "red",
            backgroundColor: "transparent",
            borderColor: "transparent",
          },
        ]}
        eventContent={(arg) => {
          if (arg.event.source?.id === "personal-event")
            return {
              html: `<div class="fc-daygrid-event-dot"></div>`,
            };
          if (arg.event.source?.id === "holiday-event")
            return {
              html: `<div class="fc-daygrid-event-dot"></div>`,
            };
        }}
      />
    </div>
  );
}
