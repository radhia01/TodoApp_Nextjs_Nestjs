"use client"
import "./globals.css";
import {Luckiest_Guy } from "next/font/google";
import { AuthProvider } from "./context/AuthContext"
import Navbar from "./_components/Navbar";
const luckiestGuy = Luckiest_Guy({
  subsets: ["latin"],
  variable: "--font-luckiest-guy",
  weight: "400",
});



export default function RootLayout({ children }) {
   
  return (
    <html lang="en">
    
      <body className={` ${luckiestGuy.variable}`}>
      <AuthProvider>
      <Navbar/>
       {children}
       </AuthProvider>
      </body>
    </html>
  );
}
