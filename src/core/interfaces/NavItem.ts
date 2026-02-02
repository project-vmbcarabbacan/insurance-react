import type { UserRole } from "../types/auth";
import type { SlugName } from "./SlugName";

export interface NavItem {
    icon: any;
    label: string;
    path?: string;
    /** RBAC */
    roles?: UserRole[];
    permissions?: SlugName[];

    children?: {
        label: string;
        path: string;
        icon: any;
        /** RBAC */
        roles?: UserRole[];
        permissions?: SlugName[];
    }[];
}