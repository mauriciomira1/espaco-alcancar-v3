import { Inter, Raleway, Quicksand } from "next/font/google";

export const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const raleway = Raleway({
  subsets: ["latin"],
  weight: ["300", "900"],
  variable: "--font-raleway",
});
export const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-quicksand",
});
