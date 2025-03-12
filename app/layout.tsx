import type { Metadata } from "next";
import Titlebar from "@/components/parts/titlebar/titlebar";
import local from "next/font/local";
import "./globals.css";
import SideMenu from "@/components/parts/sideMenu/sideMenu";

/**
 * Bringing in font families
 */

const LexendFont = local({
  src: "./fonts/Lexend.ttf",
  preload: true,
  variable: "--lexend-font",
});

const AbrilFatFace = local({
  src: "./fonts/AbrilFatface.ttf",
  preload: true,
  variable: "--abril-fontface",
});

export const metadata: Metadata = {
  title: "LivCare",
  description: "Predict Cattle Diseases in realtime",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${LexendFont.className} antialiased`}>
        <div className="main-container flex flex-col h-screen">
          <header>
            <Titlebar />
          </header>
          <div className="flex flex-1">
            <div className="sidemenu  w-[250px] h-full ">
              <SideMenu/>
            </div>
            <div className="main-content bg-neutral-900 flex-1">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
