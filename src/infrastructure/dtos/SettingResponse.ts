import type { LabelValue } from "../../core/interfaces/LabelValue"
import type { SlugName } from "../../core/interfaces/SlugName"

interface dataResponse {
    roles: SlugName[]
    statuses: LabelValue[]
}

interface productResponse {
    products: LabelValue[]
}

export interface SettingManageTeamResponse {
    data: dataResponse
    message: string
}

export interface SettingInsuranceProductResponse {
    data: productResponse
    message: string
}