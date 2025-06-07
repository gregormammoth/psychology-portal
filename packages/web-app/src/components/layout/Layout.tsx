import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Footer, Menu } from './ui';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

const menuItems = [
  { href: '/', label: 'Home' },
  { href: '/chat', label: 'Chat' },
  { href: '/contacts', label: 'Contacts' },
];

export const Layout: React.FC<LayoutProps> = ({
  children,
  title = 'Psychology Portal',
  description = 'Your trusted platform for psychological support and guidance',
}) => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Menu />

      <main className="bg-primary-50">{children}</main>

      <Footer />
    </div>
  );
}; 