import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Basquete",
  description: "Next.js environment configured for TSX development",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
