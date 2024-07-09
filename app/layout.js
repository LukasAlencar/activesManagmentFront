import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Gestão de Ativos",
  description: "Webapp para gestão de ativos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className={cn(`${inter.className} overflow-hidden h-screen w-screen flex flex-col antialiased`)}>{children}</body>
    </html>
  );
}
