import { google } from "googleapis";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.accessToken) {
    return new Response("Not authenticated", { status: 401 });
  }
  console.log(session);
  // OAuth 클라이언트 구성
  const oauth2Client = new google.auth.OAuth2();
  if (!oauth2Client) {
    return new Response("인증없음", { status: 401 });
  }
  oauth2Client.setCredentials({ access_token: session.accessToken });

  // Calendar API 클라이언트 생성
  const calendar = google.calendar({ version: "v3", auth: oauth2Client });
  if (!calendar) {
    return new Response("calendar 없음", { status: 401 });
  }
  // 이벤트 가져오기
  const response = await calendar.events.list({
    calendarId: "primary",
    timeMin: new Date().toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: "startTime",
  });
  if (!response) {
    return new Response("응답 없음", { status: 401 });
  }
  return Response.json(response.data.items);
}
