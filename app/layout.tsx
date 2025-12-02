import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FacebookPixel from "./components/FacebookPixel";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: {
    default: "Purchstar | Wholesale Tech & Electronics",
    template: "%s | Purchstar",
  },
  description: "Wholesale tech gadgets and electronics. Fast worldwide delivery in 24/48h, payment on delivery, competitive prices.",
  keywords: ["wholesale electronics", "tech gadgets", "electronics supplier", "wholesale gadgets"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans antialiased`}>
        <FacebookPixel />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
