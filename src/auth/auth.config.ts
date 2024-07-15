import type { NextAuthConfig } from 'next-auth';

export const BASE_PATH = '/api/auth';

const config: NextAuthConfig = {
  basePath: BASE_PATH,
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/login',
  },
  providers: [],
  // callbacks: {
  //   authorized({ auth, request: { nextUrl } }) {
  //     const isLoggedIn = !!auth?.user;
  //     const isOnDashboard = nextUrl.pathname.startsWith('/promoter/dashboard');
  //     if (isOnDashboard) {
  //       return isLoggedIn;
  //       // Redirect unauthenticated users to login page
  //     } else if (isLoggedIn) {
  //       return Response.redirect(new URL('/dashboard', nextUrl));
  //     }
  //     return true;
  //   },
  // },
} satisfies NextAuthConfig;

export default config;
