import { NextAuthOptions } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    CredentialProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "teste@example.com",
        },
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
        image: { label: "Image", type: "text" },
      },
      async authorize(credentials, req): Promise<any> {
        if (!credentials?.email || !credentials.password)
          throw new Error("Credênciais inválidas");

        const user = await db.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user.hashedPassword) {
          throw new Error("Credênciais inválidas");
        }

        const matchHashPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!matchHashPassword) throw new Error("Credênciais inválidas");

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  secret: process.env.SECRET,
  debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: "/",
  },
};
