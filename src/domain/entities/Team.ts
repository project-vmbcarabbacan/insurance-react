export class Team {
    constructor(
        public uuid: string,
        public name: string,
        public email: string,
        public status: string,
        public role_name: string,
    ) { }

    public toJSON() {
        return {
            uuid: this.uuid,
            name: this.name,
            email: this.email,
            status: this.status,
            role_name: this.role_name,
        };
    }
}