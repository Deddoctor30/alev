import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdmin = nextUrl.pathname.startsWith('/admin');
      const isOnLogin = nextUrl.pathname.startsWith('/login');
      if (isOnAdmin) {
        if (isLoggedIn) return true;
        return false; // Перенаправление на страницу Логина
      } 
      // if (isOnLogin) {
      //   if (isLoggedIn) return Response.redirect(new URL('/admin', nextUrl));
      //   return false; // Перенаправление на страницу Логина
      // }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;