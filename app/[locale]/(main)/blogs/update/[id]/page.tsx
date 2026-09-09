import { getTranslations } from 'next-intl/server';
import { UpdateBlogForm } from '@/features/blogs/components/UpdateBlogForm';

export default async function UpdateBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const t = await getTranslations('Blogs');

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">{t('edit', { fallback: 'تعديل المقال' })}</h1>
        <p className="text-sm text-zinc-500">{t('edit_hint', { fallback: 'تعديل تفاصيل المقال' })}</p>
      </div>
      <UpdateBlogForm blogId={id} />
    </div>
  );
}
