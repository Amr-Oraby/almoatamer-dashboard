"use client";

import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import { useTranslations } from "next-intl";
import { UrlPagination } from "@/components/ui/url-pagination";
import { useSearchParams } from "next/navigation";

import { usePermissions } from "@/features/permissions/hooks";
import { PermissionItem } from "@/features/permissions/types";

export function PermissionsTable() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const { data, isLoading } = usePermissions(page);

  const t = useTranslations("Permissions");

  const columns = useMemo<ColumnDef<PermissionItem>[]>(() => [
    {
      id: "index",
      header: "#",
      size: 60,
      cell: ({ row }) => {
        const index = (page - 1) * (data?.meta?.per_page || 20) + row.index + 1;
        return <div className="font-medium text-zinc-900 dark:text-zinc-100 px-2">{index}</div>;
      },
    },
    {
      id: "name",
      header: () => <div className="text-center">{t("name")}</div>,
      size: 200,
      cell: ({ row }) => (
        <div className="text-center font-medium text-zinc-900 dark:text-zinc-100">
          {row.original.name || "-"}
        </div>
      )
    },
    {
      id: "title_ar",
      header: () => <div className="text-center">{t("title_ar")}</div>,
      size: 200,
      cell: ({ row }) => (
        <div className="text-center font-bold text-zinc-900 dark:text-zinc-100">
          {row.original.ar?.title || "-"}
        </div>
      )
    },
    {
      id: "title_en",
      header: () => <div className="text-center">{t("title_en")}</div>,
      size: 200,
      cell: ({ row }) => (
        <div className="text-center font-bold text-zinc-900 dark:text-zinc-100">
          {row.original.en?.title || "-"}
        </div>
      )
    },
  ], [t, page, data?.meta?.per_page]);

  if (isLoading) {
    return <TableSkeleton />;
  }

  return (
    <div className="w-full relative">
      <DataTable
        columns={columns}
        data={data?.data || []}
        bottomContent={<UrlPagination pageCount={data?.meta?.last_page || 1} />}
      />
    </div>
  );
}
