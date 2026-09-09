import { getTranslations } from 'next-intl/server';
import { CreateNewsForm } from '@/features/news/components/CreateNewsForm';

export default async function CreateNewsPage() {
  const t = await getTranslations('News');

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">{t('create_new', { fallback: 'إضافة خبر جديد' })}</h1>
        <p className="text-sm text-zinc-500">{t('create_hint', { fallback: 'أضف خبراً جديداً مع تفاصيله' })}</p>
      </div>
      <CreateNewsForm />
    </div>
  );
}
