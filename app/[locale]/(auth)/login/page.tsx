"use client";

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { useLogin } from '@/features/auth/hooks';
import { LoginPayload } from '@/features/auth/types';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LoginPage() {
  const t = useTranslations('Auth');
  const router = useRouter();
  const login = useLogin();
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginPayload>();

  const onSubmit = (data: LoginPayload) => {
    login.mutate(data, {
      onSuccess: () => {
        router.push('/en'); // Redirect to dashboard
      }
    });
  };

  return (
    <div className="flex-1 flex items-center justify-center p-8 bg-zinc-50 dark:bg-zinc-950 min-h-screen">
      <Card className="w-full max-w-md border-t-4 border-t-primary shadow-lg">
        <CardHeader className="space-y-4 items-center">
          <Image src="/logo.svg" alt="Logo" width={80} height={80} className="h-16 w-auto" />
          <CardTitle className="text-2xl text-center text-primary font-bold">{t('login')}</CardTitle>
          <CardDescription className="text-center">{t('email')} & {t('password')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-foreground">{t('email')}</label>
              <input 
                type="email" 
                {...register("email", { required: "Email is required" })}
                className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                placeholder="admin@example.com"
              />
              {errors.email && <span className="text-xs text-destructive">{errors.email.message}</span>}
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-foreground">{t('password')}</label>
              <input 
                type="password" 
                {...register("password", { required: "Password is required" })}
                className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                placeholder="••••••••"
              />
              {errors.password && <span className="text-xs text-destructive">{errors.password.message}</span>}
            </div>
            
            <Button 
              type="submit" 
              className="mt-2 w-full bg-primary hover:opacity-90 text-primary-foreground font-semibold h-10"
              disabled={login.isPending}
            >
              {login.isPending ? '...' : t('submit')}
            </Button>
          </form>
          
          <div className="mt-8 flex justify-center gap-4 border-t pt-6">
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
