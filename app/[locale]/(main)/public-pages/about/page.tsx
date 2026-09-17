import { PageContainer } from "@/components/layout/PageContainer";
import { useTranslations } from 'next-intl';
import { AboutTable } from '@/features/about/components/AboutTable';

import { PermissionGuard } from '@/components/permissions-provider';

export default function AboutPage() {
  const t = useTranslations('Dashboard');
  
  return (
    <PermissionGuard permission="index-about">
      <PageContainer>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">{t('about_page')}</h1>
          </div>
        </div>

        <AboutTable />
      </PageContainer>
    </PermissionGuard>
  );
}
