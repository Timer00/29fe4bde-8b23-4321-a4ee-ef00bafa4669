import "@/styles/globals.css";

import { Inter } from "next/font/google";
import { type ReactNode } from "react";
import clsx from "clsx";
import { type Params } from "@/app/[lang]/[locale]/(main)/page";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
  params
}: {
  children: ReactNode;
  params: Params
}) {
  return (
    <html lang={params.lang} className={clsx('bg-gray-50 antialiased', inter.variable)}>
      <body>
        <div>
          {children}
        </div>
      </body>
    </html>
  );
}
