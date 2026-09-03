import { useTranslations } from 'next-intl';

export default function DashboardPage() {
  const t = useTranslations('Dashboard');

  return (
    <div className="w-full">
      <div className="mb-2">
        <span className="text-primary font-medium text-sm">{t('title')}</span>
      </div>
      <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100">
        {t('title')}
      </h1>
      <p className="mt-2 text-zinc-500">
        Track orders, revenues, products, and abandoned carts from one clear dashboard.
      </p>
    </div>
  );
}
