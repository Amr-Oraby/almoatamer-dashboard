import { useTranslations } from 'next-intl';
import { CouponCodesTable } from '@/features/coupon-codes/components/CouponCodesTable';

export default function CouponsPage() {
    const t = useTranslations('Dashboard');

    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-bold">{t('coupon-codes_page')}</h1>
                </div>
            </div>

            <CouponCodesTable />
        </div>
    );
}
