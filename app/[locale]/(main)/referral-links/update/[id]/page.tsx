import { getTranslations } from "next-intl/server";
import { UpdateReferralLinkForm } from "@/features/referral-links/components/UpdateReferralLinkForm";
import { PageHeader } from "@/components/ui/page-header";

export default async function UpdateReferralLinkPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
    const { locale, id } = await params;
    const t = await getTranslations({ locale, namespace: "Dashboard" });

    return (
        <div className="space-y-6">
            <PageHeader
                title={t("edit_referral_link", { fallback: "تعديل رابط الإحالة" })}
                description={t("edit_referral_link_desc", { fallback: "تعديل بيانات رابط الإحالة" })}
            />
            <UpdateReferralLinkForm linkId={id} />
        </div>
    );
}
