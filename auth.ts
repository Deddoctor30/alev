import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { getAdminByEmail } from './app/actions/adminActions';
const bcrypt = require('bcrypt');
 
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string() })
          .safeParse(credentials);

          if (parsedCredentials.success) {
            const { email, password } = parsedCredentials.data;
            
            const user = await getAdminByEmail(email);
            console.log('123', user);
            if (!user) return null;

            
            // const passwordsMatch = await bcrypt.compare(password, user.password);
            const passwordsMatch = password === user.password;
            
            if (passwordsMatch) return user;
          }
          console.log('Неверные реквизиты входа');
          return null

      },
    }),
  ],
});