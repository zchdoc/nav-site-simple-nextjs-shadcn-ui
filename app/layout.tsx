import './globals.css';
import 'antd/dist/reset.css';  // 添加这一行
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from "@/components/theme-provider"

// ... 其余代码保持不变
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  // FastUrl Navigation
  title: '常用站',
  description: 'A simple navigation page built with Next.js and shadcn/ui',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
