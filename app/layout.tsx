import React from 'react';
import Providers from './providers';
import '../src/index.css';
import '../src/styles/App.scss';
import '../src/styles/background/gradient/gradient-animation-clear.scss';
import '../src/styles/background/gradient/gradient-animation-dark.scss';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
