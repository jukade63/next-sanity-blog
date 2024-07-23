import type { Metadata } from "next";
import { Roboto, Lora } from "next/font/google";
import "./globals.css";
import { Provider } from "../utils/Provider";

const lora = Lora({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://data-digit-blog.vercel.app/"),
  title: {
    default: "Data Digit",
    template: "Data Digit",
  },
  description: "A blog for data analysts",
  openGraph: {
    title: "Data Digit - A blog for data analysts",
    description: "A blog for data analysts, by data analysts!",
    type: "website",
    locale: "en_US",
    url: "https://data-digit-blog.vercel.app/",
    siteName: "Data Digit",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${lora.className} h-full tracking-wide relative`}>
        {/* <div className="w-[800px] h-3/5 bg-opacity-60 dark:bg-opacity-25 bg-amber-200 rounded-full absolute -z-10  blur-[90px]"></div>
        <div className="w-[800px] h-[30%] bg-opacity-60 dark:bg-opacity-25 bg-amber-200 rounded-full absolute -z-10 top-3/4 left-1/2  blur-[90px]"></div> */}
        <Provider>
          <main className="h-full mx-auto max-w-7xl px-6 mb-20">{children}</main>
        </Provider>
      </body>
    </html>
  );
}
