import { Alata, Poppins, Roboto } from "next/font/google";

export const poppins = Poppins({
  weight: ["300", "400", "500", "600", "800"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
  preload: false
});

export const alata = Alata({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  preload: false
});

export const roboto = Roboto({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
  preload: false
});

