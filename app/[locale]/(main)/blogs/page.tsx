import { getTranslations } from 'next-intl/server';
import { BlogsTable } from '@/features/blogs/components/BlogsTable';
import { Link } from '@/i18n/routing';
import { Plus } from 'lucide-react';

import { PermissionGuard } from '@/components/permissions-provider';

export default async function BlogsPage() {
  const t = await getTranslations('Dashboard');
  const tBlogs = await getTranslations('Blogs');

  return (
    <PermissionGuard permission="index-blog">
      <div className="flex flex-col gap-6 p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">{t('blogs_page')}</h1>
          </div>
          <PermissionGuard permission="create-blog" type="element">
            <Link
              href="/blogs/create"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white rounded-xl px-4 py-2.5 text-sm font-medium shadow-sm transition-colors"
            >
              <Plus className="w-4 h-4" />
              {tBlogs('create_new', { fallback: 'إضافة مقال' })}
            </Link>
          </PermissionGuard>
        </div>

        <BlogsTable />
      </div>
    </PermissionGuard>
  );
}
