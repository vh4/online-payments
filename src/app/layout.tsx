'use client';

import 'rsuite/Button/styles/index.css';
import './globals.css'; // Custom global styles

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="min-h-screen text-sm">
        <main className="">
          {children}
        </main>
      </body>
    </html>
  );
}
