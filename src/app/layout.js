import "./globals.css";
export const metadata = {
  title: "First Code Lab",
  description: "A Coding Institution which teaches kids from the ages of 8-50+",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="">{children}</body>
    </html>
  );
}
