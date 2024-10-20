import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NavBar from "./ui/NavBar";
import AuthProvider from "./auth/AuthProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Issue Tracker",
  description: "Issue tracking application",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          <NavBar />
          <main className="w-full h-[calc(100vh-80px)] absolute top-[80px] left-0 overflow-y-auto p-6">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
