import { useTranslations } from 'next-intl';
import { HowToStartForm } from '@/features/how-to-start/components/HowToStartForm';

export default function HowToStartPage() {
  const t = useTranslations('HowToStart');
  
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          {t('main_info', { fallback: 'How to start' })}
        </h1>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          Manage the text and steps displayed in the how to start section.
        </p>
      </div>
      
      <HowToStartForm />
    </div>
  );
}
