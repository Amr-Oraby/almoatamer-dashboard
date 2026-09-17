import { PageContainer } from "@/components/layout/PageContainer";
import { getTranslations } from 'next-intl/server';
import { CreateNewsForm } from '@/features/news/components/CreateNewsForm';

import { PermissionGuard } from '@/components/permissions-provider';

export default async function CreateNewsPage() {
  const t = await getTranslations('News');

  return (
    <PermissionGuard permission="create-news">
      <PageContainer>
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold">{t('create_new', { fallback: 'إضافة خبر جديد' })}</h1>
          <p className="text-sm text-zinc-500">{t('create_hint', { fallback: 'أضف خبراً جديداً مع تفاصيله' })}</p>
        </div>
        <CreateNewsForm />
      </PageContainer>
    </PermissionGuard>
  );
}
