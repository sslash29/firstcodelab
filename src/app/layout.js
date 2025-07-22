import "./globals.css";
export const metadata = {
  title: "brent faiyaz",
  description: "E-commerce app by abccommerce",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="">{children}</body>
    </html>
  );
}
