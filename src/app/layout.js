import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";
export const metadata = {
  title: "First Code Lab",
  description: "A Coding Institution which teaches kids from the ages of 8-50+",
  viewport: {
    width: "device-width",
    initialScale: 1.0,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
