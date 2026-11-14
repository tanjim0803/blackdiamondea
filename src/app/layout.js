// src/app/layout.jsx
"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/shared/header";
import "./globals.css";
import Footer from "@/components/shared/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TelegramButton from "@/components/shared/TelegramButton";
import GetFreeAIButton from "@/components/shared/GetFreeAIButton";
import ScrollToTop from "@/components/shared/scroll-to-top";
import SocialSidebar from "@/components/shared/SocialSidebar";
import Script from "next/script";
import FreeOfferPopupGlobal from "@/components/popup/FreeOfferPopupGlobal";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  variable: "--font-mono",
  display: "swap",
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isResellerRoute = pathname?.startsWith("/reseller");

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${jakarta.variable} ${jetbrains.variable}`}
    >
      <body
        style={{ fontFamily: "var(--font-jakarta), sans-serif" }}
        className={`antialiased transition-colors duration-300 selection:bg-amber-400 selection:text-black ${
          isResellerRoute
            ? ""
            : "bg-[#FAF7F0] text-zinc-900 dark:bg-[#050507] dark:text-white"
        }`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {!isResellerRoute && (
            <header className="sticky top-0 z-50">
              <Header />
            </header>
          )}

          <main className={isResellerRoute ? "min-h-screen" : "min-h-[70vh]"}>
            {children}
          </main>

          {!isResellerRoute && (
            <footer>
              <Footer />
            </footer>
          )}

          {!isResellerRoute && (
            <>
              <SocialSidebar />
              <ScrollToTop />
              <GetFreeAIButton />
              <TelegramButton />
              <FreeOfferPopupGlobal />
            </>
          )}

          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </ThemeProvider>

        {/* Histats */}
        <Script
          id="histats"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var _Hasync = _Hasync || [];
              _Hasync.push(['Histats.start', '1,4238682,4,0,0,0,00010000']);
              _Hasync.push(['Histats.fasi', '1']);
              _Hasync.push(['Histats.track_hits', '']);

              (function() {
                var hs = document.createElement('script');
                hs.type = 'text/javascript';
                hs.async = true;
                hs.src = '//s10.histats.com/js15_as.js';

                (document.getElementsByTagName('head')[0] ||
                 document.getElementsByTagName('body')[0])
                  .appendChild(hs);
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}