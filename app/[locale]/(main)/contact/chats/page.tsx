import { getTranslations } from 'next-intl/server';
import { ChatsLayout } from '@/features/chats/components/ChatsLayout';

export default async function ChatsPage() {
  const t = await getTranslations('Chats');
  
  return (
    <div className="flex flex-col gap-6 p-6 h-full max-h-[calc(100vh-64px)] overflow-hidden">
      <div className="flex items-center justify-between shrink-0">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">{t('chats_title')}</h1>
        </div>
      </div>

      <div className="flex-1 min-h-0">
         <ChatsLayout />
      </div>
    </div>
  );
}
