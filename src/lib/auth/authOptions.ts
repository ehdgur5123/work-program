import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope:
            "openid email profile https://www.googleapis.com/auth/calendar.readonly",
          access_type: "offline", // 리프레시 토큰 발급
          prompt: "consent", // 항상 권한 허용 요청
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        // unknown 타입 처리
        const accessToken = (account as any).access_token as string | undefined;
        const refreshToken = (account as any).refresh_token as
          | string
          | undefined;

        if (accessToken) token.accessToken = accessToken;
        if (refreshToken) token.refreshToken = refreshToken;
      }
      return token;
    },

    async session({ session, token }) {
      // 세션에 JWT에서 가져온 토큰 할당
      if (token.accessToken) session.accessToken = token.accessToken;
      if (token.refreshToken) session.refreshToken = token.refreshToken;
      return session;
    },
  },
};
