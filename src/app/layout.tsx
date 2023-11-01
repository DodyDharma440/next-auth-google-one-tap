import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { AuthProvider } from "@/components";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <AuthProvider session={session}>
        <body className={inter.className}>
          {children}
          {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
          <Script
            src="https://accounts.google.com/gsi/client"
            strategy="beforeInteractive"
          />
        </body>
      </AuthProvider>
    </html>
  );
}
