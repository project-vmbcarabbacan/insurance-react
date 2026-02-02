import type { SlugName } from "../interfaces/SlugName";
import type { UserRole } from "../types/auth";

interface AccessArgs {
    userRole: UserRole;
    userPermissions: SlugName[];
    roles?: UserRole[];
    permissions?: SlugName[];
}

export function hasAccess({
    userRole,
    userPermissions,
    roles,
    permissions
}: AccessArgs) {
    if (roles && !roles.includes(userRole)) return false;

    if (
        permissions &&
        !permissions.every(p => userPermissions.includes(p))
    ) {
        return false;
    }

    return true;
}
