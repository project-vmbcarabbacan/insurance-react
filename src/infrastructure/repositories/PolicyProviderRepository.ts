import type { PolictMessageResponse, PolicyActiveResponse, PolicyForm, PolicyPagination, PolicyPaginationResponse, PolicySearchResponse, PolicyStatus } from "../../core/interfaces/Policy";
import type { PolicyProviderContract } from "../../domain/contracts/PolicyProviderContract";
import type { ApiService } from "../api/ApiService";
import { API_URL } from "../api/Urls";

export class PolicyProviderRepository implements PolicyProviderContract {
    constructor(private api: ApiService) { }

    async paginate(data: PolicyPagination): Promise<PolicyPaginationResponse> {
        return await this.api.get<PolicyPaginationResponse>(`/${API_URL.setting.provider.pagination}`, {
            params: { ...data }
        })
    }

    async add(data: PolicyForm): Promise<PolictMessageResponse> {
        return await this.api.post<PolictMessageResponse>(`/${API_URL.setting.provider.store}`, data)
    }

    async update(data: PolicyForm): Promise<PolictMessageResponse> {
        const { uuid, ...payload } = data
        return await this.api.put<PolictMessageResponse>(`/${API_URL.setting.provider.update}/${uuid}`, payload)
    }


    async search(uuid: string): Promise<PolicySearchResponse> {
        return await this.api.get<PolicySearchResponse>(`/${API_URL.setting.provider.search}/${uuid}`)
    }

    async status(data: PolicyStatus): Promise<PolictMessageResponse> {
        return await this.api.patch<PolictMessageResponse>(`/${API_URL.setting.provider.status}`, data)
    }

    async active(): Promise<PolicyActiveResponse> {
        return await this.api.get<PolicyActiveResponse>(`/${API_URL.setting.provider.active}`)
    }

}