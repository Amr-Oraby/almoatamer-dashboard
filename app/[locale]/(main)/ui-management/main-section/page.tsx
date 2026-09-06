import { useTranslations } from 'next-intl';
import { EndpointBadge } from '@/components/ui/endpoint-badge';

export default function MainSectionPage() {
  const t = useTranslations('Dashboard');
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{t('main_section')}</h1>
      <EndpointBadge>umrah-home-info</EndpointBadge>
      <p className="text-zinc-600 dark:text-zinc-400">
        This is the main section management page.
      </p>
      <p className="text-sm font-medium text-blue-600 mt-2">
        Text & image changer
      </p>
    </div>
  );
}
