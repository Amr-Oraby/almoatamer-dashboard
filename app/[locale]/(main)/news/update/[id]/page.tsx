import { getTranslations } from 'next-intl/server';
import { UpdateNewsForm } from '@/features/news/components/UpdateNewsForm';

export default async function UpdateNewsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const t = await getTranslations('News');

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">{t('edit', { fallback: 'تعديل الخبر' })}</h1>
        <p className="text-sm text-zinc-500">{t('edit_hint', { fallback: 'تعديل تفاصيل الخبر' })}</p>
      </div>
      <UpdateNewsForm newsId={id} />
    </div>
  );
}
