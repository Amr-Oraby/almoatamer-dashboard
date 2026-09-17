import { PageContainer } from "@/components/layout/PageContainer";
import { getTranslations } from "next-intl/server";
import { UpdateReferralLinkForm } from "@/features/referral-links/components/UpdateReferralLinkForm";

export default async function UpdateReferralLinkPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
    const { locale, id } = await params;
    const t = await getTranslations({ locale, namespace: "Dashboard" });

    return (
        <PageContainer>
            <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold">{t("edit_referral_link", { fallback: "تعديل رابط الإحالة" })}</h1>
                <p className="text-sm text-zinc-500">{t("edit_referral_link_desc", { fallback: "تعديل بيانات رابط الإحالة" })}</p>
            </div>
            <UpdateReferralLinkForm linkId={id} />
        </PageContainer>
    );
}
