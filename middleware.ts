import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
 
export default NextAuth(authConfig).auth;
 
export const config = {
  matcher: ['/admin', '/login']
  // matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
};