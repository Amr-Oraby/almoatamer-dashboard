import { getTranslations, getLocale } from 'next-intl/server';
import { UpdateCountryForm } from '@/features/countries/components/UpdateCountryForm';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default async function UpdateCountryPage({ params }: { params: Promise<{ id: string }> }) {
  const t = await getTranslations('Dashboard');
  const locale = await getLocale();
  const { id } = await params;
  
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center gap-4">
        <Link href={`/${locale}/places/countries`} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
            <ArrowRight className="w-5 h-5 rtl:rotate-180" />
        </Link>
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">{t('update_country')}</h1>
        </div>
      </div>

      <UpdateCountryForm countryId={id} />
    </div>
  );
}
