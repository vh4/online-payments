'use client';

import { Provider } from 'react-redux';
import 'rsuite/dist/rsuite.min.css';
import './globals.css'; // Custom global styles
import Header from './components/desktop/HeaderComponent';
import store from './store'; // Redux store import

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
        <meta name="description" content="Pay PLN bills and purchase tokens easily." />
        <title>PLN Service Portal</title>
      </head>
      <body className="min-h-screen text-sm bg-white">
        <Provider store={store}>
          <Header />
          <main className="">{children}</main>
        </Provider>
      </body>
    </html>
  );
}
