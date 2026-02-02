import { LabelValue } from "../../../domain/entities/LabelValue";
import type { RootState } from "../store";

export const selectRoles = (state: RootState) => state.setting.roles.map(setting => new LabelValue(setting.slug, setting.name))
export const SelectStatuses = (state: RootState) => state.setting.statuses.map(setting => new LabelValue(setting.value, setting.label))