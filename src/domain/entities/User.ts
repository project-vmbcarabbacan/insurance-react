import type { SlugName } from "../../core/interfaces/SlugName";

export class User {
    constructor(
        public uuid: string,
        public name: string,
        public initials: string,
        public email: string,
        public status: string,
        public role_slug: string,
        public role_name: string,
        public permissions: SlugName[]
    ) { }

    public toJSON() {
        return {
            uuid: this.uuid,
            name: this.name,
            initials: this.initials,
            email: this.email,
            status: this.status,
            role_slug: this.role_slug,
            role_name: this.role_name,
            permissions: this.permissions
        };
    }
}