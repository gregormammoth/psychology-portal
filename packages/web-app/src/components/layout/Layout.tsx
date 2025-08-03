import React from 'react';
import Head from 'next/head';
import { /* Chat, */ Footer, Menu } from './ui';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  title = 'Psychology Portal',
  description = 'Your trusted platform for psychological support and guidance',
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Menu />

      <main className="bg-primary-50 pt-16">{children}</main>

      <Footer />
      {/* <Chat /> */}
    </div>
  );
}; 