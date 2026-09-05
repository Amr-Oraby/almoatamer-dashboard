import { useTranslations } from 'next-intl';

export default function FooterPage() {
  const t = useTranslations('Dashboard');
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Footer UI Management</h1>
      <p className="text-zinc-600 dark:text-zinc-400">
        This page allows you to manage the UI of the footer section of the website.
      </p>
    </div>
  );
}
