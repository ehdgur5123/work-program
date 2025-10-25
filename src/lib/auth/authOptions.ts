import axios from "axios";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";

interface GoogleAccount {
  provider: "google";
  type: "oauth";
  providerAccountId: string;
  access_token: string;
  expires_at: number; // Unix timestamp
  refresh_token: string;
  scope: string;
  token_type: string;
  id_token: string;
  refresh_token_expires_in?: number;
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope:
            "openid email profile https://www.googleapis.com/auth/calendar.readonly",
          access_type: "offline",
          prompt: "consent",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, account }) {
      // 로그인 직후: access/refresh token 저장

      if (account) {
        // account를 GoogleAccount 타입으로 단언
        const googleAccount = account as GoogleAccount;

        token.accessToken = googleAccount.access_token;
        token.refreshToken = googleAccount.refresh_token;

        // expires_at은 Google에서 Unix timestamp (초 단위)로 줌 → ms 단위 변환
        token.expiresAt = googleAccount.expires_at * 1000;

        return token;
      }

      // Access Token이 만료되었는지 확인
      if (Date.now() < (token.expiresAt as number)) {
        return token; // 아직 유효
      }

      // 만료됐다면 새 토큰 발급 요청
      try {
        const response = await axios.post(
          "https://oauth2.googleapis.com/token",
          new URLSearchParams({
            client_id: process.env.GOOGLE_CLIENT_ID!,
            client_secret: process.env.GOOGLE_CLIENT_SECRET!,
            grant_type: "refresh_token",
            refresh_token: token.refreshToken as string,
          }),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        );

        const refreshedTokens = response.data;
        token.accessToken = refreshedTokens.access_token;
        token.expiresAt = Date.now() + refreshedTokens.expires_in * 1000;
      } catch (error) {
        console.error("토큰 갱신 실패:", error);
        token.error = "RefreshAccessTokenError";
      }

      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      return session;
    },
  },
};
