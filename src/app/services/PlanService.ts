import type { PlanActiveResponse, PlanForm, PlanMessageResponse, PlanPagination, PlanPaginationResponse, PlanSearchResponse, PlanStatus } from "../../core/interfaces/Plan";
import type { PlanContract } from "../../domain/contracts/PlanContract";

export class PlanService {
    constructor(private plan: PlanContract) { }

    async paginate(data: PlanPagination): Promise<PlanPaginationResponse> {
        return await this.plan.paginate(data)
    }

    async add(data: PlanForm): Promise<PlanMessageResponse> {
        return await this.plan.add(data)
    }

    async update(data: PlanForm): Promise<PlanMessageResponse> {
        return await this.plan.update(data)
    }


    async updatePlan(uuid: string): Promise<PlanSearchResponse> {
        return await this.plan.updatePlan(uuid)
    }

    async addPlan(code: string): Promise<PlanSearchResponse> {
        return await this.plan.addPlan(code)
    }

    async status(data: PlanStatus): Promise<PlanMessageResponse> {
        return await this.plan.status(data)
    }

    async active(code: string): Promise<PlanActiveResponse> {
        return await this.plan.active(code)
    }
}