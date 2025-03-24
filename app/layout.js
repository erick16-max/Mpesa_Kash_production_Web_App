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
  title: "Deriva Add Pesa",
  description: "Deposit/Add to deriv trading platform from mpesa and Withdraw from your Deriv Account to your Mpesa wallet",
};

export default function RootLayout({ children  }) {
  
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
