"use client"

import { useParams } from "next/navigation"
import { useTranslations } from "next-intl"
import { useWhyUsItem } from "@/features/why-us/hooks"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, FileText, Globe } from "lucide-react"

const LOCALES = [
    { key: "ar" as const, label: "العربية" },
    { key: "en" as const, label: "English" },
    { key: "fa" as const, label: "فارسی" },
    { key: "ms" as const, label: "Melayu" },
    { key: "tr" as const, label: "Türkçe" },
    { key: "iid" as const, label: "Indonesian" },
]

export default function WhyUsShowPage() {
    const params = useParams()
    const id = params.id as string
    const { data: response, isLoading, isError } = useWhyUsItem(id)
    const t = useTranslations("WhyUs")

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
                <p className="text-lg font-medium text-zinc-500">غير موجود</p>
            </div>
        )
    }

    const item = response.data

    return (
        <div className="space-y-6 pb-10 max-w-4xl mx-auto p-6">
            <Card className="rounded-2xl border-zinc-100 dark:border-zinc-800 shadow-sm overflow-hidden">
                {/* Header */}
                <div className="flex items-center gap-4 bg-zinc-50/50 dark:bg-zinc-900/50 p-6 border-b border-zinc-100 dark:border-zinc-800">
                    <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-primary/10 relative flex-shrink-0">
                        {item.icon ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={item.icon} alt={item.title} className="h-full w-full object-contain p-2" />
                        ) : (
                            <FileText className="h-8 w-8 text-primary" />
                        )}
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 leading-tight">
                            {item.title || "بدون عنوان"}
                        </h1>
                        <p className="text-sm text-zinc-500 font-medium mt-1">#{item.id}</p>
                    </div>
                </div>

                <CardContent className="p-0">
                    {/* Default (AR) description */}
                    {item.description && (
                        <div className="p-6 border-b border-zinc-100 dark:border-zinc-800">
                            <p className="text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    )}

                    {/* Locale Translations */}
                    <div className="p-6 space-y-4">
                        <h2 className="flex items-center gap-2 text-base font-bold text-zinc-900 dark:text-zinc-100">
                            <Globe className="w-5 h-5 text-primary" />
                            {t("translations", { fallback: "الترجمات" })}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {LOCALES.map(locale => {
                                const localeData = item[locale.key]
                                if (!localeData?.title && !localeData?.description) return null

                                return (
                                    <div key={locale.key} className="rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 p-4 space-y-2">
                                        <span className="inline-block px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-bold">
                                            {locale.label}
                                        </span>
                                        {localeData.title && (
                                            <p className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">{localeData.title}</p>
                                        )}
                                        {localeData.description && (
                                            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{localeData.description}</p>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
