import { useTranslations } from 'next-intl';

export default function GalleryPage() {
  const t = useTranslations('Dashboard');
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{t('gallery')}</h1>
      <p className="text-zinc-600 dark:text-zinc-400">
        This is the gallery management page.
      </p>
    </div>
  );
}
