import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Homeworks",
  description: "My first project with next js in Codigo facilito",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="sticky top-0 z-10 border-b border-gray-200/80 bg-white/70 px-6 py-4 backdrop-blur-md dark:border-gray-800/80 dark:bg-gray-950/70">
          <Link
            href="/home"
            className="bg-gradient-to-r from-sky-500 to-emerald-500 bg-clip-text text-xl font-extrabold tracking-tight text-transparent transition-opacity hover:opacity-80"
          >
            Mis Tareas
          </Link>
        </header>
        {children}
        <footer className="mt-auto border-t border-gray-200/80 bg-white/70 px-6 py-4 text-center text-sm text-gray-500 backdrop-blur-md dark:border-gray-800/80 dark:bg-gray-950/70 dark:text-gray-400">
          <span className="bg-gradient-to-r from-sky-500 to-emerald-500 bg-clip-text font-semibold text-transparent">
            Mis Tareas
          </span>{" "}
          — Codigo Facilito
        </footer>
      </body>
    </html>
  );
}
