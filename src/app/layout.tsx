import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/shared/ui/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Parcial 1 - jd.quinteroa1",
  description: "Parcial 1/ Programacion con tecnologias web/ jd.quinteroa1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const routes = [
    { name: "Actors", path: "/actors" },
    { name: "Movies", path: "/movies" },
    { name: "Crear Actor", path: "/actors/crear" },
    { name: "Crear Movie", path: "/movies/crear" },
    { name: "Crear Premio", path: "/prizes" },
  ];

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header routes={routes} />
        {children}
      </body>
    </html>
  );
}
