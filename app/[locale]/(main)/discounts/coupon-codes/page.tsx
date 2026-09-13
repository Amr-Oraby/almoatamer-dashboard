import { useTranslations } from 'next-intl';
import { CouponCodesTable } from '@/features/coupon-codes/components/CouponCodesTable';
import { CreateCouponCodeModal } from '@/features/coupon-codes/components/CreateCouponCodeModal';
import { PermissionGuard } from '@/components/permissions-provider';

export default function CouponsPage() {
    const t = useTranslations('Dashboard');

    return (
        <PermissionGuard permission="index-coupon-codes">
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold">{t('coupon-codes_page')}</h1>
                    </div>
                    <PermissionGuard permission="create-coupon-codes" type="element">
                        <CreateCouponCodeModal />
                    </PermissionGuard>
                </div>

                <CouponCodesTable />
            </div>
        </PermissionGuard>
    );
}
