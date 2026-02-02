export class ID {
    private readonly id: string | number;

    constructor(id: string | number) {
        this.id = id;
    }

    public static create(id: string | number): ID {
        if (!this.isValid(id)) {
            throw new Error(`Invalid ID: ${id}`);
        }
        return new ID(id);
    }

    public get value(): string | number {
        return this.id;
    }

    public equals(other: ID): boolean {
        return this.id === other.id;
    }

    public toString(): string {
        return String(this.id);
    }

    private static isValid(id: string | number): boolean {
        if (typeof id === 'number') {
            return Number.isInteger(id) && id > 0;
        }

        if (typeof id === 'string') {
            // UUID v4 format (basic validation)
            return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);
        }

        return false;
    }
}
