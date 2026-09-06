import { useTranslations } from 'next-intl';
import { EndpointBadge } from '@/components/ui/endpoint-badge';

export default function GalleryPage() {
  const t = useTranslations('Dashboard');
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{t('gallery')}</h1>
      <EndpointBadge>home-banners</EndpointBadge>
      <p className="text-zinc-600 dark:text-zinc-400">
        This is the gallery management page.
      </p>
      <p className="text-sm font-medium text-blue-600 mt-2">
        Table view
      </p>
    </div>
  );
}
