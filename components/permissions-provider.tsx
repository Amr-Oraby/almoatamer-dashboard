"use client";

import { useMyPermissions } from "@/features/permissions/hooks";
import {
    createContext,
    useContext,
    useMemo,
    type ReactNode,
} from "react";

type PermissionContextValue = {
    permissions: Set<string>;
    can: (permission: string) => boolean;
    canAny: (permissions: string[]) => boolean;
    canAll: (permissions: string[]) => boolean;
    isLoading: boolean;
};

const PermissionContext = createContext<PermissionContextValue | null>(null);

export function PermissionProvider({
    children,
}: {
    children: ReactNode;
}) {
    const { data: myPermissionsResponse, isLoading } = useMyPermissions();

    const permissions = useMemo(() => {
        const perms = new Set<string>();
        if (myPermissionsResponse?.data) {
            myPermissionsResponse.data.forEach(item => perms.add(item.name));
        }
        return perms;
    }, [myPermissionsResponse]);

    const can = (permission: string) => permissions.has(permission);
    const canAny = (perms: string[]) => perms.some((p) => permissions.has(p));
    const canAll = (perms: string[]) => perms.every((p) => permissions.has(p));

    return (
        <PermissionContext.Provider value={{ permissions, can, canAny, canAll, isLoading }}>
            {children}
        </PermissionContext.Provider>
    );
}

export function usePermissions() {
    const context = useContext(PermissionContext);
    if (!context) {
        throw new Error("usePermissions must be used within a PermissionProvider");
    }
    return context;
}

import { useTranslations } from "next-intl";

interface PermissionGuardProps {
    children: ReactNode;
    permission?: string;
    permissionsAny?: string[];
    permissionsAll?: string[];
    /**
     * "page" will render a full-screen loading state and a 403 Forbidden UI if unauthorized.
     * "element" will render `null` while loading and if unauthorized, useful for hiding buttons/links.
     */
    type?: "page" | "element";
    /** Optional fallback UI to show instead of the default behavior */
    fallback?: ReactNode;
}

export function PermissionGuard({
    children,
    permission,
    permissionsAny,
    permissionsAll,
    type = "page",
    fallback,
}: PermissionGuardProps) {
    const { can, canAny, canAll, isLoading } = usePermissions();
    const t = useTranslations("Dashboard");

    if (isLoading) {
        if (type === "element") return null;

        return (
            <div className="p-8 space-y-4 w-full h-full flex flex-col items-center justify-center min-h-[50vh]">
                <span className="animate-spin border-4 border-primary border-t-transparent rounded-full w-8 h-8" />
            </div>
        );
    }

    let hasAccess = true;

    if (permission) hasAccess = can(permission);
    else if (permissionsAny) hasAccess = canAny(permissionsAny);
    else if (permissionsAll) hasAccess = canAll(permissionsAll);

    if (!hasAccess) {
        if (fallback !== undefined) return <>{fallback}</>;

        if (type === "element") return null;

        return (
            <div className="flex flex-col items-center justify-center p-12 text-center h-[60vh] bg-card rounded-2xl border border-border/60 shadow-sm mt-4 animate-in fade-in zoom-in duration-500">
                <h1 className="text-6xl font-black text-destructive mb-4 drop-shadow-sm">403</h1>
                <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
                <p className="text-lg text-muted-foreground max-w-md">
                    You do not have the required permissions to view this page. Please contact your administrator if you believe this is a mistake.
                </p>
            </div>
        );
    }

    return <>{children}</>;
}
