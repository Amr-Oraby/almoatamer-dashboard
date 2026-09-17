import { PageContainer } from "@/components/layout/PageContainer";
import { useTranslations } from 'next-intl';
import { DeletionAuditsTable } from '@/features/deletion-audits/components/DeletionAuditsTable';

export default function DeletionAuditsPage() {
  const t = useTranslations('Dashboard');
  
  return (
    <PageContainer>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">{t('deletion_audits', { fallback: "سجلات الحذف" })}</h1>
        </div>
      </div>

      <DeletionAuditsTable />
    </PageContainer>
  );
}
