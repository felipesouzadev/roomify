import "./globals.css";
import Providers from './providers';
import Topmenu from '../components/Topmenu';
import Sidebar from '../components/Sidebar';
import { Inter } from 'next/font/google'
import { getServerSession } from 'next-auth';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "Roomify",
  description: "",
  icons: {
    icon: "/favicon.ico"
  },
};

export default async function RootLayout({children }) {
  const session = await getServerSession();
  return (
    <html lang="en" suppressHydrationWarning >
      <body className={`${inter.className} bg-background text-foreground`}>
        <Providers>
            {session && <Topmenu />}
            <div className="flex">
              {session && <Sidebar />}
              <main className="flex flex-row justify-center w-full h-full">
                  {children}
              </main>
            </div>
            <footer></footer>
        </Providers>
      </body>
    </html>
  );
}
