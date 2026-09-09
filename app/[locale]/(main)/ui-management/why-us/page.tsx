import { getTranslations, getLocale } from 'next-intl/server';
import { WhyUsTable } from '@/features/why-us/components/WhyUsTable';
import { CreateWhyUsModal } from '@/features/why-us/components/CreateWhyUsModal';

export default async function WhyUsPage() {
  const t = await getTranslations('Dashboard');

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">{t('why_us')}</h1>
        </div>
        <CreateWhyUsModal />
      </div>

      <WhyUsTable />
    </div>
  );
}
