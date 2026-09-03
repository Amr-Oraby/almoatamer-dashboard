import type { Metadata } from "next";
import { Inter, Tajawal } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Simple Dashboard with next-intl and shadcn",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

import { Toaster } from 'sonner';

import { QueryProvider } from '@/lib/providers/QueryProvider';

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  const fontVariable = locale === 'ar' ? tajawal.variable : inter.variable;
  const fontClass = locale === 'ar' ? tajawal.className : inter.className;

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${fontVariable} h-full antialiased`}
    >
      <body className={`${fontClass} min-h-full flex flex-col`}>
        <QueryProvider>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
          <Toaster richColors position="top-right" />
        </QueryProvider>
      </body>
    </html>
  );
}
