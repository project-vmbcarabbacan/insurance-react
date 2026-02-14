import type { PlanActiveResponse, PlanForm, PlanMessageResponse, PlanPagination, PlanPaginationResponse, PlanSearchResponse, PlanStatus } from "../../core/interfaces/Plan"

export type PlanContract = {
    paginate(data: PlanPagination): Promise<PlanPaginationResponse>
    add(data: PlanForm): Promise<PlanMessageResponse>
    update(data: PlanForm): Promise<PlanMessageResponse>
    updatePlan(uuid: string): Promise<PlanSearchResponse>
    addPlan(code: string): Promise<PlanSearchResponse>
    status(data: PlanStatus): Promise<PlanMessageResponse>
    active(code: string): Promise<PlanActiveResponse>
}