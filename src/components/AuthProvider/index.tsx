"use client";

import React from "react";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

type AuthProviderProps = {
  session: Session | null;
  children: React.ReactNode;
};

const AuthProvider: React.FC<AuthProviderProps> = ({ session, children }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default AuthProvider;
