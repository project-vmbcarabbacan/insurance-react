import type { PolictMessageResponse, PolicyActiveResponse, PolicyForm, PolicyPagination, PolicyPaginationResponse, PolicySearchResponse, PolicyStatus } from "../../core/interfaces/Policy"

export type PolicyProviderContract = {
    paginate(data: PolicyPagination): Promise<PolicyPaginationResponse>
    add(data: PolicyForm): Promise<PolictMessageResponse>
    update(data: PolicyForm): Promise<PolictMessageResponse>
    search(uuid: string): Promise<PolicySearchResponse>
    status(data: PolicyStatus): Promise<PolictMessageResponse>
    active(): Promise<PolicyActiveResponse>
}