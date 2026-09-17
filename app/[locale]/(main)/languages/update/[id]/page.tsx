import { PageContainer } from "@/components/layout/PageContainer";
import { getTranslations, getLocale } from 'next-intl/server';
import { UpdateLanguageForm } from '@/features/languages/components/UpdateLanguageForm';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { PermissionGuard } from '@/components/permissions-provider';

export default async function UpdateLanguagePage({ params }: { params: Promise<{ id: string }> }) {
  const t = await getTranslations('Dashboard');
  const locale = await getLocale();
  const { id } = await params;
  
  return (
    <PermissionGuard permission="update-language">
      <PageContainer>
      <div className="flex items-center gap-4">
        <Link href={`/${locale}/languages/show-all`} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
            <ArrowRight className="w-5 h-5 rtl:rotate-180" />
        </Link>
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">{t('update_language') || 'Update Language'}</h1>
        </div>
      </div>

      <UpdateLanguageForm languageId={id} />
    </PageContainer>
    </PermissionGuard>
  );
}
