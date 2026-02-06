import { LabelValue } from "../../../domain/entities/LabelValue";
import type { RootState } from "../store";

export const selectRoles = (state: RootState) => state.setting.roles.map(setting => new LabelValue(setting.slug, setting.name))
export const SelectStatuses = (state: RootState) => state.setting.statuses.map(setting => new LabelValue(setting.value, setting.label))
export const SelectTypes = (state: RootState) => state.setting.types.map(setting => new LabelValue(setting.value, setting.label))
export const SelectProducts = (state: RootState) => state.setting.insurance_products.map(setting => new LabelValue(setting.label, setting.value))
export const SelectCountryCodes = (state: RootState) => state.setting.country_codes.map(setting => new LabelValue(setting.value, setting.value))
export const SelectCustomerSources = (state: RootState) => state.setting.customer_sources.map(setting => new LabelValue(setting.value, setting.label))
export const SelectGenders = (state: RootState) => state.setting.genders.map(setting => new LabelValue(setting.value, setting.label))
export const SelectAccessed = (state: RootState) => state.setting.accessed
export const SelectYears = (state: RootState) => state.setting.years.map(setting => new LabelValue(setting.value, setting.label))
export const SelectClaimHistories = (state: RootState) => state.setting.claim_histories.map(setting => new LabelValue(setting.value, setting.label))
export const SelectPolicyTypes = (state: RootState) => state.setting.policy_types.map(setting => new LabelValue(setting.value, setting.label))
export const SelectSpecificationTypes = (state: RootState) => state.setting.specification_types.map(setting => new LabelValue(setting.value, setting.label))
export const SelectYesNo = (state: RootState) => state.setting.yes_no.map(setting => new LabelValue(setting.value, setting.label))
export const SelectMakes = (state: RootState) => state.setting.makes.map(setting => new LabelValue(setting.label, setting.value))
export const SelectModels = (state: RootState) => state.setting.models.map(setting => new LabelValue(setting.label, setting.value))
export const SelectTrims = (state: RootState) => state.setting.trims.map(setting => new LabelValue(setting.label, setting.value))
export const SelectCountries = (state: RootState) => state.setting.countries.map(setting => new LabelValue(setting.value, setting.label))
export const SelectEmirates = (state: RootState) => state.setting.emirates.map(setting => new LabelValue(setting.value, setting.label))