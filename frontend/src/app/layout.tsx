import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="jp">
      <body className="bg-gray-100">
        <main className="container mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
