"use client"

import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Phone, Mail, ShieldAlert, Trash2, Calendar, FileJson, Server, Activity, Loader2 } from 'lucide-react';
import { useDeletionAudit } from '@/features/deletion-audits/hooks';
import { format } from 'date-fns';

export default function DeletionAuditShowPage() {
  const params = useParams();
  const id = params.id as string;
  const t = useTranslations('Dashboard');
  const tCommon = useTranslations('Common');

  const { data: response, isLoading, isError } = useDeletionAudit(id);

  if (isLoading) {
    return (
      <div className="flex h-[300px] w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !response || !response.data) {
    return (
      <div className="flex flex-col gap-6 p-6 items-center justify-center h-[50vh]">
        <Trash2 className="w-16 h-16 text-zinc-300" />
        <h2 className="text-xl font-bold text-zinc-500">{tCommon('no_results', { fallback: "لا توجد نتائج" })}</h2>
      </div>
    );
  }

  const audit = response.data;

  return (
    <div className="flex flex-col gap-6 p-6 max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-xl">
            <Trash2 className="w-6 h-6 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{t('deletion_audit_details', { fallback: "تفاصيل سجل الحذف" })} #{audit.id}</h1>
            <p className="text-sm text-zinc-500 mt-1">{t('deletion_date', { fallback: "تاريخ الحذف" })}: {audit.deleted_at ? format(new Date(audit.deleted_at), "dd/MM/yyyy HH:mm:ss") : "-"}</p>
          </div>
        </div>
        <Badge variant="outline" className="text-sm px-4 py-1.5 bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-400 border-red-200 dark:border-red-900">
          {audit.deletion_type}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Deleted User Info */}
        <Card className="shadow-sm">
          <CardHeader className="border-b bg-zinc-50/50 dark:bg-zinc-900/50">
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="w-5 h-5 text-blue-500" />
              {t('deleted_user_info', { fallback: "بيانات المستخدم المحذوف" })}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-3 gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3">
                <span className="text-zinc-500 text-sm">{tCommon('title', { fallback: "الاسم" })}</span>
                <span className="col-span-2 font-medium">{audit.deleted_user_name || "-"}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3">
                <span className="text-zinc-500 text-sm">ID</span>
                <span className="col-span-2 font-medium">{audit.deleted_user_id}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3">
                <span className="text-zinc-500 text-sm"><Mail className="w-4 h-4 inline-block mr-1"/> Email</span>
                <span className="col-span-2 font-medium">{audit.deleted_user_email || "-"}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3">
                <span className="text-zinc-500 text-sm"><Phone className="w-4 h-4 inline-block mr-1"/> Phone</span>
                <span className="col-span-2 font-medium">{audit.deleted_user_phone || "-"}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3">
                <span className="text-zinc-500 text-sm">Status</span>
                <span className="col-span-2 font-medium">{audit.deleted_user_status || "-"}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 pb-1">
                <span className="text-zinc-500 text-sm"><Calendar className="w-4 h-4 inline-block mr-1"/> Created At</span>
                <span className="col-span-2 font-medium">{audit.additional_data?.user_created_at || "-"}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Triggered By Info */}
        <Card className="shadow-sm">
          <CardHeader className="border-b bg-zinc-50/50 dark:bg-zinc-900/50">
            <CardTitle className="text-lg flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-orange-500" />
              {t('triggered_by_info', { fallback: "المنفذ للعملية" })}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-3 gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3">
                <span className="text-zinc-500 text-sm">{tCommon('title', { fallback: "الاسم" })}</span>
                <span className="col-span-2 font-medium">{audit.triggered_by_user_name || "-"}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3">
                <span className="text-zinc-500 text-sm">ID</span>
                <span className="col-span-2 font-medium">{audit.triggered_by_user_id || "-"}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 pb-1">
                <span className="text-zinc-500 text-sm">Role</span>
                <span className="col-span-2 font-medium">{audit.triggered_by_user_role || "-"}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Request & Server Info */}
        <Card className="shadow-sm md:col-span-2">
          <CardHeader className="border-b bg-zinc-50/50 dark:bg-zinc-900/50">
            <CardTitle className="text-lg flex items-center gap-2">
              <Server className="w-5 h-5 text-indigo-500" />
              {t('request_details', { fallback: "تفاصيل الطلب" })}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1 p-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
                <span className="text-xs text-zinc-500 uppercase font-semibold">URL</span>
                <span className="font-mono text-sm break-all">{audit.request_url || "-"}</span>
              </div>
              <div className="flex flex-col gap-1 p-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
                <span className="text-xs text-zinc-500 uppercase font-semibold">Method & Source</span>
                <span className="font-mono text-sm">{audit.request_method || "-"} | {audit.deletion_method || "-"}</span>
              </div>
              <div className="flex flex-col gap-1 p-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
                <span className="text-xs text-zinc-500 uppercase font-semibold">IP Address</span>
                <span className="font-mono text-sm">{audit.request_ip || "-"}</span>
              </div>
              <div className="flex flex-col gap-1 p-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
                <span className="text-xs text-zinc-500 uppercase font-semibold">User Agent</span>
                <span className="font-mono text-sm truncate" title={audit.user_agent}>{audit.user_agent || "-"}</span>
              </div>
              <div className="flex flex-col gap-1 p-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg md:col-span-2">
                <span className="text-xs text-zinc-500 uppercase font-semibold">Source Class/Method</span>
                <span className="font-mono text-sm break-all">{audit.deletion_source || "-"}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Related Records Deleted */}
        {audit.related_records_deleted && Object.keys(audit.related_records_deleted).length > 0 && (
          <Card className="shadow-sm md:col-span-2 border-red-200 dark:border-red-900">
            <CardHeader className="border-b bg-red-50/50 dark:bg-red-900/10">
              <CardTitle className="text-lg flex items-center gap-2 text-red-700 dark:text-red-400">
                <Activity className="w-5 h-5" />
                {t('related_records_deleted', { fallback: "السجلات المرتبطة التي تم حذفها" })}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(audit.related_records_deleted).map(([table, count]) => (
                    <div key={table} className="flex flex-col items-center justify-center p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
                       <span className="text-2xl font-bold text-red-600 dark:text-red-400">{count as number}</span>
                       <span className="text-sm font-medium mt-1">{table}</span>
                    </div>
                  ))}
               </div>
            </CardContent>
          </Card>
        )}

        {/* Stack Trace */}
        {audit.stack_trace && audit.stack_trace.length > 0 && (
          <Card className="shadow-sm md:col-span-2">
            <CardHeader className="border-b bg-zinc-50/50 dark:bg-zinc-900/50">
              <CardTitle className="text-lg flex items-center gap-2">
                <FileJson className="w-5 h-5 text-emerald-500" />
                {t('stack_trace', { fallback: "تتبع الخطوات (Stack Trace)" })}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 overflow-hidden">
               <div className="max-h-96 overflow-y-auto p-4 bg-zinc-950 text-zinc-300 font-mono text-xs leading-relaxed">
                  {audit.stack_trace.map((trace: any, idx: number) => (
                    <div key={idx} className="mb-3 pb-3 border-b border-zinc-800 last:border-0 last:mb-0 last:pb-0">
                      <div className="text-emerald-400">#{idx} {trace.class ? trace.class + '::' : ''}{trace.function}</div>
                      <div className="text-zinc-500 pl-4">{trace.file}:{trace.line}</div>
                    </div>
                  ))}
               </div>
            </CardContent>
          </Card>
        )}

      </div>
    </div>
  );
}
