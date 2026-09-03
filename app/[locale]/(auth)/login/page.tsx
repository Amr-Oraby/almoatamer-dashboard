import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';

export default function LoginPage() {
  const t = useTranslations('Auth');

  return (
    <div className="flex-1 flex items-center justify-center p-8 bg-zinc-50 dark:bg-zinc-950">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-center">{t('login')}</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">{t('email')}</label>
              <input 
                type="email" 
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">{t('password')}</label>
              <input 
                type="password" 
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                required
              />
            </div>
            <Button type="button" className="mt-2 w-full">
              <Link href="/en">{t('submit')}</Link>
            </Button>
          </form>
          
          <div className="mt-6 flex justify-center gap-4 border-t pt-4">
            <Link href="/en/login" className={buttonVariants({ variant: "ghost", size: "sm" })}>
              English
            </Link>
            <Link href="/ar/login" className={buttonVariants({ variant: "ghost", size: "sm" })}>
              العربية
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
