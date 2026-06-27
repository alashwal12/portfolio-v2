import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Using Inter as planned
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { db } from "@/lib/db";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Abdulmajeed | Data Analyst & BI Developer",
  description: "Portfolio of Abdulmajeed, a Data Analyst and BI Developer specializing in turning data into actionable insights.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const profile = await db.profile.findFirst();
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans bg-background text-foreground antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar resumeUrl={profile?.resumeUrl} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
