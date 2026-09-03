"use client";

import { useTranslations } from 'next-intl';
import { useDashboardStats } from '@/features/dashboard/hooks';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Users, Briefcase, Activity, Tag, FileText, Share2, Globe, Languages, MessageSquare, Target } from 'lucide-react';
import Link from 'next/link';
import { DashboardStat } from '@/features/dashboard/types';

const getIconForStat = (key: string) => {
  if (key.includes('moatmer')) return Users;
  if (key.includes('client')) return Briefcase;
  if (key.includes('umrah')) return Activity;
  if (key.includes('coupon')) return Tag;
  if (key.includes('blog')) return FileText;
  if (key.includes('referral')) return Share2;
  if (key.includes('countr')) return Globe;
  if (key.includes('language')) return Languages;
  if (key.includes('chat')) return MessageSquare;
  return Target;
};

export default function DashboardPage() {
  const t = useTranslations('Dashboard');
  const { data: statsResponse, isLoading } = useDashboardStats();
  const stats: DashboardStat[] = statsResponse?.data || [];

  return (
    <div className="w-full space-y-8">
      <div>
        <div className="mb-2">
          <span className="text-primary font-bold text-sm tracking-wider uppercase">{t('title')}</span>
        </div>
        <h1 className="text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
          {t('title')}
        </h1>
        <p className="mt-3 text-lg text-zinc-500 max-w-2xl">
          {t('subtitle') || 'Overview of your statistics and metrics.'}
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-32">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = getIconForStat(stat.key);
            
            return (
              <Link key={stat.id} href={stat.route} className="block group">
                <Card className="h-full overflow-hidden border-0 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl ring-1 ring-zinc-200/50 dark:ring-zinc-800/50 hover:ring-primary/50 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1">
                  <CardContent className="p-6 flex flex-col justify-between h-full">
                    <div className="flex items-start justify-between space-x-4 mb-4">
                      <div className="p-3 bg-primary/10 rounded-2xl group-hover:bg-primary group-hover:text-white text-primary transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/30">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="text-right">
                        <h2 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                          {stat.count}
                        </h2>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 group-hover:text-primary transition-colors line-clamp-2">
                        {t(stat.key as any) !== `${stat.key}` ? t(stat.key as any) : stat.title}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
