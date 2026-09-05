import { useTranslations } from 'next-intl';

export default function MainSectionPage() {
  const t = useTranslations('Dashboard');
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{t('main_section')}</h1>
      <p className="text-zinc-600 dark:text-zinc-400">
        This is the main section management page.
      </p>
    </div>
  );
}
