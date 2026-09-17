import { PageContainer } from "@/components/layout/PageContainer";
import { useTranslations } from 'next-intl';
import { ThankingWordsTable } from '@/features/thanking-words/components/ThankingWordsTable';
import { CreateThankingWordModal } from '@/features/thanking-words/components/CreateThankingWordModal';
import { PermissionGuard } from '@/components/permissions-provider';

export default function ThankingWordPage() {
  const t = useTranslations('Dashboard');

  return (
    <PermissionGuard permission="index-home-info">
      <PageContainer>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">{t('thanking_word')}</h1>
        </div>
        <PermissionGuard permission="create-home-info" type="element">
          <CreateThankingWordModal />
        </PermissionGuard>
      </div>

      <ThankingWordsTable />
    </PageContainer>
    </PermissionGuard>
  );
}
