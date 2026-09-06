"use client"

import { useParams } from "next/navigation"
import { useTranslations } from "next-intl"
import { useNewsItem } from "@/features/news/hooks"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, FileText, Link2, Search, Image as ImageIcon, TextQuote } from "lucide-react"

export default function NewsDetailsPage() {
  const params = useParams()
  const id = params.id as string
  const { data: response, isLoading, isError } = useNewsItem(id)
  const t = useTranslations("News")

  if (isLoading) {
    return (
      <div className="flex h-[300px] w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (isError || !response?.data) {
    return (
      <div className="flex h-[300px] w-full items-center justify-center">
        <p className="text-lg font-medium text-zinc-500">{t("not_found")}</p>
      </div>
    )
  }

  const newsItem = response.data

  return (
    <div className="space-y-6 pb-10 max-w-5xl mx-auto">
      {/* Unified Details Card */}
      <Card className="rounded-2xl border-zinc-100 dark:border-zinc-800 shadow-sm overflow-hidden">
        {/* News Cover Image */}
        {newsItem.images?.image ? (
            <div className="w-full h-64 md:h-80 relative overflow-hidden bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-100 dark:border-zinc-800">
                <img 
                    src={newsItem.images.image} 
                    alt={newsItem.alt || newsItem.title} 
                    className="w-full h-full object-cover" 
                />
            </div>
        ) : (
            <div className="w-full h-40 bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-center">
                <ImageIcon className="w-12 h-12 text-zinc-300 dark:text-zinc-700" />
            </div>
        )}

        {/* Compact Header */}
        <div className="flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-900/50 p-6 border-b border-zinc-100 dark:border-zinc-800">
          <div>
            <div className="flex items-center gap-3 mb-2">
                <Badge variant={newsItem.is_active ? "default" : "secondary"} className="rounded-lg text-sm px-3 py-1">
                    {newsItem.is_active ? t("active") : t("inactive")}
                </Badge>
                <span className="text-xs text-zinc-500 font-bold bg-zinc-200/50 dark:bg-zinc-800/50 px-2 py-1 rounded-md">
                    #{newsItem.id}
                </span>
            </div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 leading-tight">
              {newsItem.title || t("no_title")}
            </h1>
          </div>
        </div>

        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x rtl:md:divide-x-reverse divide-zinc-100 dark:divide-zinc-800">
            
            {/* Main Content */}
            <div className="p-6 space-y-6 md:col-span-2">
              <div className="space-y-3">
                <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                    <TextQuote className="w-5 h-5 text-primary" />
                    {t("short_desc")}
                </h2>
                <p className="text-base text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed bg-zinc-50/50 dark:bg-zinc-900/50 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800">
                    {newsItem.short_desc || "-"}
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    {t("description")}
                </h2>
                <div 
                    className="text-base text-zinc-700 dark:text-zinc-300 leading-relaxed prose dark:prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: newsItem.description || "-" }}
                />
              </div>
            </div>

            {/* SEO & Meta Info */}
            <div className="p-6 space-y-6 bg-zinc-50/30 dark:bg-zinc-900/30">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-3 flex items-center gap-2">
                  <Search className="w-5 h-5 text-primary" />
                  {t("seo_info")}
              </h2>
              
              <div className="space-y-4">
                  <div>
                      <p className="text-xs font-bold text-zinc-500 uppercase mb-1">{t("slug")}</p>
                      <div className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300 font-medium break-all bg-white dark:bg-zinc-950 p-3 rounded-xl border border-zinc-100 dark:border-zinc-800 shadow-sm">
                          <Link2 className="w-4 h-4 shrink-0 text-zinc-400" />
                          <span>{newsItem.slug || "-"}</span>
                      </div>
                  </div>

                  <div>
                      <p className="text-xs font-bold text-zinc-500 uppercase mb-1">{t("canonical")}</p>
                      <div className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300 font-medium break-all bg-white dark:bg-zinc-950 p-3 rounded-xl border border-zinc-100 dark:border-zinc-800 shadow-sm">
                          <Link2 className="w-4 h-4 shrink-0 text-zinc-400" />
                          <span>{newsItem.canonical || "-"}</span>
                      </div>
                  </div>

                  <div>
                      <p className="text-xs font-bold text-zinc-500 uppercase mb-1">{t("keywords")}</p>
                      <p className="text-sm text-zinc-700 dark:text-zinc-300 font-medium bg-white dark:bg-zinc-950 p-3 rounded-xl border border-zinc-100 dark:border-zinc-800 shadow-sm">
                          {newsItem.keywords || "-"}
                      </p>
                  </div>

                  <div>
                      <p className="text-xs font-bold text-zinc-500 uppercase mb-1">{t("alt_text")}</p>
                      <p className="text-sm text-zinc-700 dark:text-zinc-300 font-medium bg-white dark:bg-zinc-950 p-3 rounded-xl border border-zinc-100 dark:border-zinc-800 shadow-sm">
                          {newsItem.alt || "-"}
                      </p>
                  </div>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>
    </div>
  )
}
