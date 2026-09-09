import { getTranslations } from 'next-intl/server';
import { ProfileForm } from '@/features/profile/components/ProfileForm';

export default async function ProfilePage() {
  const t = await getTranslations('Profile');
  
  return (
    <div className="p-4 md:p-6 space-y-6 w-full">
      <div>
        <h1 className="text-2xl font-bold">{t('title')}</h1>
        <p className="text-zinc-500">{t('description')}</p>
      </div>

      <ProfileForm />
    </div>
  );
}
