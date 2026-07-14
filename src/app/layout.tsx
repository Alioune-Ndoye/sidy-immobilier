import type { Metadata } from "next";
import {  Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import RegisterModal from "@/modals/RegisterModal";
import LoginModal from "@/modals/LoginModal";
import { Toaster } from "react-hot-toast";
import CreateListingModal from "@/modals/CreateListingModal";
import FilterModal from "@/modals/FilterModal";
import Footer from "@/components/general/Footer";

const poppins = Poppins({
  variable:"--font-poppins",
  subsets:["latin"],
  weight:["300","400","500","600","700"]
})

export const metadata: Metadata = {
  title: "Sidy Immobilier",
  description:
    "Sidy Immobilier — locations de vacances et résidences partout au Sénégal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${poppins.className} antialiased bg-white text-gray-900`}
      >
        <Navbar/>
        <div className='mt-18 lg:mt-24 px-4 md:px-20 py-2 min-h-[60vh]'>
        {children}
        </div>
        <Footer/>
        <RegisterModal/>
        <LoginModal/>
        <Toaster/>
        <CreateListingModal/>
        <FilterModal/>
      </body>
    </html>
  );
}
