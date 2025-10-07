import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Library Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="max-w-[1440px] w-full h-screen flex justify-center mx-auto">
        {children}
      </body>
    </html>
  );
}
