import { getTranslations } from 'next-intl/server';
import { CreateBlogForm } from '@/features/blogs/components/CreateBlogForm';

export default async function CreateBlogPage() {
  const t = await getTranslations('Blogs');

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">{t('create_new', { fallback: 'إضافة مقال جديد' })}</h1>
        <p className="text-sm text-zinc-500">{t('create_hint', { fallback: 'أضف مقالاً جديداً مع تفاصيله' })}</p>
      </div>
      <CreateBlogForm />
    </div>
  );
}
