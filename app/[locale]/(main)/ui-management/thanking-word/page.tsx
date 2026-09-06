import { useTranslations } from 'next-intl';
import { ThankingWordsTable } from '@/features/thanking-words/components/ThankingWordsTable';

export default function ThankingWordPage() {
  const t = useTranslations('Dashboard');

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">{t('thanking_word')}</h1>
        </div>
      </div>

      <ThankingWordsTable />
    </div>
  );
}
