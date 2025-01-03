import localFont from "next/font/local";
import "./globals.css";
import { CustomThemeProvider } from "@/theme/ThemeContextProvider";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import TokenHandler from "@/util/TokenHandler";
import { useTokenHandler } from "@/hooks/useTokenHandler";


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

export const metadata = {
  title: "Binary Mpesa Services",
  description: "Deposit and Withdraw from Deriv Account using Mpesa",
};

export default function RootLayout({ children  }) {
  // Handle tokens on entry
  useTokenHandler();
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AppRouterCacheProvider>
          <CustomThemeProvider>
            {/* <TokenHandler /> */}
            {children}
          </CustomThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
