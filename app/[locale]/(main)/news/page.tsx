import { getTranslations } from 'next-intl/server';
import { NewsTable } from '@/features/news/components/NewsTable';
import { Link } from '@/i18n/routing';
import { Plus } from 'lucide-react';

export default async function NewsPage() {
  const t = await getTranslations('Dashboard');
  const tNews = await getTranslations('News');
  
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">{t('news_page')}</h1>
        </div>
        <Link
          href="/news/create"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white rounded-xl px-4 py-2.5 text-sm font-medium shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          {tNews('create_new', { fallback: 'إضافة خبر' })}
        </Link>
      </div>

      <NewsTable />
    </div>
  );
}
