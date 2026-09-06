import { useTranslations } from 'next-intl';
import { NewsTable } from '@/features/news/components/NewsTable';

export default function NewsPage() {
  const t = useTranslations('Dashboard');
  
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">{t('news_page')}</h1>
        </div>
      </div>

      <NewsTable />
    </div>
  );
}
