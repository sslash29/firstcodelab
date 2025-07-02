import "./globals.css";
export const metadata = {
  title: "abc",
  description: "E-commerce app by abccommerce",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body className="text-white bg-[#252525]">{children}</body>
    </html>
  );
}
