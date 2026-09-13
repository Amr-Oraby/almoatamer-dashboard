import { useTranslations } from 'next-intl';
import { UsersChatsTable } from '@/features/users-chats/components/UsersChatsTable';
import { PermissionGuard } from '@/components/permissions-provider';

export default function UsersChatsPage() {
  const t = useTranslations('Dashboard');
  
  return (
    <PermissionGuard permission="index-users-chats">
      <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">{t('users_chats')}</h1>
        </div>
      </div>

      <UsersChatsTable />
    </div>
    </PermissionGuard>
  );
}
