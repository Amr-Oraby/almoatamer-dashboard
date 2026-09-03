import { useTranslations } from 'next-intl';

export default function UsersPage() {
  const t = useTranslations('Dashboard');

  return (
    <div className="w-full">
      <div className="mb-2">
        <span className="text-primary font-medium text-sm">{t('users')}</span>
      </div>
      <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100">
        {t('users')}
      </h1>
      <p className="mt-2 text-zinc-500">
        Manage your platform users and their permissions from this dashboard.
      </p>
    </div>
  );
}
