import { getTranslations } from 'next-intl/server';
import { ChangePasswordForm } from '@/features/profile/components/ChangePasswordForm';

export default async function ChangePasswordPage() {
  const t = await getTranslations('Dashboard');
  
  return (
    <div className="p-4 md:p-6 space-y-6 w-full">
      <ChangePasswordForm />
    </div>
  );
}
