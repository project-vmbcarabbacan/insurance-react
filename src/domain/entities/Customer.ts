export class Customer {
    constructor(
        public uuid: string,
        public name: string,
        public email: string,
        public status: string,
        public phone: string,
        public type: string,
    ) { }

    public toJSON() {
        return {
            uuid: this.uuid,
            name: this.name,
            email: this.email,
            status: this.status,
            phone: this.phone,
            type: this.type,
        };
    }
}