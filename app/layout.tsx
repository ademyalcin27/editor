import './globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'YAML Config Studio',
  description: 'Edit YAML configs with a form and editor.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}