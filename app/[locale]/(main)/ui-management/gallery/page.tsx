import { PageContainer } from "@/components/layout/PageContainer";
import { useTranslations } from 'next-intl';
import { HomeBannersGrid } from '@/features/home-banners/components/HomeBannersGrid';
import { CreateHomeBannerModal } from '@/features/home-banners/components/CreateHomeBannerModal';
import { PermissionGuard } from '@/components/permissions-provider';

export default function GalleryPage() {
  const t = useTranslations('Dashboard');
  
  return (
    <PermissionGuard permission="index-banner">
      <PageContainer>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">{t('gallery')}</h1>
        </div>
        <PermissionGuard permission="create-banner" type="element">
          <CreateHomeBannerModal />
        </PermissionGuard>
      </div>

      <HomeBannersGrid />
    </PageContainer>
    </PermissionGuard>
  );
}
