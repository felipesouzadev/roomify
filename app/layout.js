import localFont from "next/font/local";
import "./globals.css";
import ProtectedPage from '../components/ProtectedPage';
import Sidebar from '../components/Sidebar';
import Topmenu from '../components/Topmenu';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <ProtectedPage>
      <div className="flex min-h-screen bg-gray-100">
          <Sidebar />
          <div className="flex-grow flex flex-col">
            <Topmenu />
            <main className="flex-grow p-6 bg-primary-light">{children}</main>
          </div>
        </div>
      </ProtectedPage>
      </body>
    </html>
  );
}
