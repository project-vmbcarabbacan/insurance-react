import type { PolictMessageResponse, PolicyActiveResponse, PolicyForm, PolicyPagination, PolicyPaginationResponse, PolicySearchResponse, PolicyStatus } from "../../core/interfaces/Policy";
import type { PolicyProviderContract } from "../../domain/contracts/PolicyProviderContract";

export class PolicyProviderService {
    constructor(private policy: PolicyProviderContract) { }

    async paginate(data: PolicyPagination): Promise<PolicyPaginationResponse> {
        return await this.policy.paginate(data)
    }

    async add(data: PolicyForm): Promise<PolictMessageResponse> {
        return await this.policy.add(data)
    }

    async update(data: PolicyForm): Promise<PolictMessageResponse> {
        return await this.policy.update(data)
    }


    async search(uuid: string): Promise<PolicySearchResponse> {
        return await this.policy.search(uuid)
    }

    async status(data: PolicyStatus): Promise<PolictMessageResponse> {
        return await this.policy.status(data)
    }

    async active(): Promise<PolicyActiveResponse> {
        return await this.policy.active()
    }
}