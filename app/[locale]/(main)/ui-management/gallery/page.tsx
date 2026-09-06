import { useTranslations } from 'next-intl';
import { HomeBannersTable } from '@/features/home-banners/components/HomeBannersTable';

export default function GalleryPage() {
  const t = useTranslations('Dashboard');
  
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">{t('gallery')}</h1>
        </div>
      </div>

      <HomeBannersTable />
    </div>
  );
}
