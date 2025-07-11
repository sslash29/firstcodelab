import "./globals.css";
export const metadata = {
  title: "brent faiyaz",
  description: "E-commerce app by abccommerce",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="text-white bg-[#252525] p-2">{children}</body>
    </html>
  );
}
