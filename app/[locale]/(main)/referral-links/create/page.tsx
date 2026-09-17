import { PageContainer } from "@/components/layout/PageContainer";
import { useTranslations } from 'next-intl';
import { CreateReferralLinkForm } from '@/features/referral-links/components/CreateReferralLinkForm';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useLocale } from 'next-intl';

export default function CreateReferralLinkPage() {
  const t = useTranslations('Dashboard');
  const locale = useLocale();
  
  return (
    <PageContainer>
      <div className="flex items-center gap-4">
        <Link href={`/${locale}/referral-links/show-all`} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
            <ArrowRight className="w-5 h-5 rtl:rotate-180" />
        </Link>
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">{t('create_new_referral_link')}</h1>
        </div>
      </div>

      <CreateReferralLinkForm />
    </PageContainer>
  );
}
