import { Outfit } from 'next/font/google';
import './globals.css';

import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { ReduxProvider } from '@/components/redux/slices/ReduxProvider';
import { Toaster } from "react-hot-toast";
const outfit = Outfit({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} dark:bg-gray-900`}>

        <ReduxProvider> 
        <ThemeProvider>
          <Toaster position="top-right" />
          <SidebarProvider>{children}</SidebarProvider>
        </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
