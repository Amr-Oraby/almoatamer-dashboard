import { PageContainer } from "@/components/layout/PageContainer";
import { getTranslations } from 'next-intl/server';
import { MoatmrsTable } from '@/features/moatmrs/components/MoatmrsTable';
import { Link } from '@/i18n/routing';
import { Plus } from 'lucide-react';
import { PermissionGuard } from '@/components/permissions-provider';

export default async function AlmoatamersPage() {
  const t = await getTranslations('Dashboard');
  const tAlmoatamers = await getTranslations('Almoatamers');
  
  return (
    <PermissionGuard permission="index-moatmer">
      <PageContainer>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">{t('almoatamers_page')}</h1>
          </div>
          <PermissionGuard permission="create-moatmer" type="element">
            <Link
              href="/moatmers/create"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white rounded-xl px-4 py-2.5 text-sm font-medium shadow-sm transition-colors"
            >
              <Plus className="w-4 h-4" />
              {tAlmoatamers('create_new', { fallback: 'إضافة معتمر' })}
            </Link>
          </PermissionGuard>
        </div>

        <MoatmrsTable />
      </PageContainer>
    </PermissionGuard>
  );
}
