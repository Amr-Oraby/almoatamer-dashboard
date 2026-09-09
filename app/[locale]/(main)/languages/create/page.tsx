import { useTranslations } from 'next-intl';
import { CreateLanguageForm } from '@/features/languages/components/CreateLanguageForm';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useLocale } from 'next-intl';

export default function CreateLanguagePage() {
  const t = useTranslations('Dashboard');
  const locale = useLocale();
  
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center gap-4">
        <Link href={`/${locale}/languages`} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
            <ArrowRight className="w-5 h-5 rtl:rotate-180" />
        </Link>
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">{t('create_new_language')}</h1>
        </div>
      </div>

      <CreateLanguageForm />
    </div>
  );
}
