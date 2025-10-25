"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import koLocale from "@fullcalendar/core/locales/ko";
import { useSession } from "next-auth/react";

export default function Calendar() {
  const { data: session } = useSession();

  if (!session?.accessToken) return <p>로그인이 필요합니다.</p>;

  return (
    <div className="p-4 text-sm">
      <FullCalendar
        height={600}
        plugins={[dayGridPlugin, googleCalendarPlugin]}
        initialView="dayGridMonth"
        locale={koLocale}
        googleCalendarApiKey={process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY}
        dayCellDidMount={(arg) => {
          const day = arg.date.getDay();
          const numberEl = arg.el.querySelector(".fc-daygrid-day-number");
          if (!numberEl) return;

          if (day === 0)
            (numberEl as HTMLElement).classList.add("text-red-700"); // 일요일
          if (day === 6)
            (numberEl as HTMLElement).classList.add("text-blue-700"); // 토요일
        }}
        eventSources={[
          {
            // 개인 캘린더
            googleCalendarId: "primary",
            extraParams: { access_token: session.accessToken },
          },
          {
            // 한국 공휴일
            googleCalendarId:
              "ko.south_korea#holiday@group.v.calendar.google.com",
            extraParams: { access_token: session.accessToken },
            color: "green", // 공휴일 이벤트 색상
            textColor: "white", // 글자 색
          },
        ]}
      />
    </div>
  );
}
