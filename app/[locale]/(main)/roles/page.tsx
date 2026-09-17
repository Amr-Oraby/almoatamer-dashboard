import { PageContainer } from "@/components/layout/PageContainer";
import { useTranslations } from 'next-intl';
import { RolesTable } from '@/features/roles/components/RolesTable';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function RolesPage() {
  const t = useTranslations('Dashboard');
  
  return (
    <PageContainer>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">{t('roles_page')}</h1>
        </div>
        <Link href="/roles/create">
          <Button className="gap-2 bg-primary hover:bg-primary/90">
             <Plus className="w-4 h-4" />
             {t('add_role', { fallback: "إضافة دور" })}
          </Button>
        </Link>
      </div>

      <RolesTable />
    </PageContainer>
  );
}
