import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ContractProvider } from '../context/ContractsContext';
import "./globals.css";
import { ThemeProvider } from "./provider";
import Register from "../app/register/page";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BuilderBox",
  description: "Modern Client Taker for builders",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/hammerlogo.png" sizes="any" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ContractProvider>
            {children}
          </ContractProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
