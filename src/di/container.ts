export class Container {
    private services = new Map<string, any>()

    register<T>(token: string, instance: T): void {
        this.services.set(token, instance)
    }

    resolve<T>(token: string): T {
        const service = this.services.get(token)
        if (!service) throw new Error(`Service not found: ${token}`)
        return service
    }

    clear(): void {
        this.services.clear()
    }
}

export const container = new Container()
