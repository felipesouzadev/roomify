import "./globals.css";
import Providers from './providers';
import Topmenu from '../components/Topmenu';
import { Inter } from 'next/font/google'
import { getServerSession } from 'next-auth';
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ['latin'] })
const session = await getServerSession();
export const metadata = {
  title: "Roomify",
  description: "",
  icons: {
    icon: "/favicon.ico"
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
      <Providers>
        {session && <Topmenu />}
          <main>
            <div className="flex items-center flex-col justify-start min-h-screen gap-2 m-10">
            {children}
            </div>
          </main>
          <footer></footer>
        </Providers>
      </body>
    </html>
  );
}
