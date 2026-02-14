import type { PlanActiveResponse, PlanForm, PlanMessageResponse, PlanPagination, PlanPaginationResponse, PlanSearchResponse, PlanStatus } from "../../core/interfaces/Plan";
import type { PlanContract } from "../../domain/contracts/PlanContract";
import type { ApiService } from "../api/ApiService";
import { API_URL } from "../api/Urls";

export class PlanRepository implements PlanContract {
    constructor(private api: ApiService) { }

    async paginate(data: PlanPagination): Promise<PlanPaginationResponse> {
        return await this.api.get<PlanPaginationResponse>(`/${API_URL.setting.plan.pagination}`, {
            params: { ...data }
        })
    }

    async add(data: PlanForm): Promise<PlanMessageResponse> {
        return await this.api.post<PlanMessageResponse>(`/${API_URL.setting.plan.store}`, data)
    }

    async update(data: PlanForm): Promise<PlanMessageResponse> {
        const { uuid, ...payload } = data
        return await this.api.put<PlanMessageResponse>(`/${API_URL.setting.plan.update}/${uuid}`, payload)
    }


    async updatePlan(uuid: string): Promise<PlanSearchResponse> {
        return await this.api.get<PlanSearchResponse>(`/${API_URL.setting.plan.updatePlan}/${uuid}`)
    }

    async addPlan(code: string): Promise<PlanSearchResponse> {
        return await this.api.get<PlanSearchResponse>(`/${API_URL.setting.plan.addPlan}/${code}`)
    }

    async status(data: PlanStatus): Promise<PlanMessageResponse> {
        return await this.api.patch<PlanMessageResponse>(`/${API_URL.setting.plan.status}`, data)
    }

    async active(code: string): Promise<PlanActiveResponse> {
        return await this.api.get<PlanActiveResponse>(`/${API_URL.setting.plan.active}/${code}`)
    }

}