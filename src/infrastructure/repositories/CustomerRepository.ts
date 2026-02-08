import type { ApiService } from "../api/ApiService";
import { API_URL } from "../api/Urls";
import type { CustomerContract } from "../../domain/contracts/CustomerContract";
import type { CustomerFilter, patchCustomer, UpsertCustomer } from "../../core/interfaces/Customer";
import type { CustomerDetailsResponse, CustomerMessageResponse, CustomerResponse, SingleCustomerResponse } from "../dtos/CustomerResponse";

export class CustomerRepository implements CustomerContract {
    constructor(private api: ApiService) { }

    async customers(data: CustomerFilter): Promise<CustomerResponse> {
        return await this.api.get<CustomerResponse>(`/${API_URL.customer.customers}`, {
            params: { ...data }
        })
    }

    async customer(uuid: string): Promise<SingleCustomerResponse> {
        return await this.api.get<SingleCustomerResponse>(`/${API_URL.customer.customers}/${uuid}`)
    }

    async customerDetails(uuid: string): Promise<CustomerDetailsResponse> {
        return await this.api.get<CustomerDetailsResponse>(`/${API_URL.customer.details}/${uuid}`)
    }

    async createCustomer(data: UpsertCustomer): Promise<CustomerMessageResponse> {
        return await this.api.post<CustomerMessageResponse>(`/${API_URL.customer.addCustomer}`, data)
    }

    async updateCustomer(data: UpsertCustomer): Promise<CustomerMessageResponse> {
        const { uuid, ...payload } = data
        return await this.api.put<CustomerMessageResponse>(`/${API_URL.customer.updateCustomer}/${uuid}`, payload)
    }

    async patchCustomer(data: patchCustomer): Promise<CustomerMessageResponse> {
        const { uuid, ...payload } = data
        return await this.api.patch<CustomerMessageResponse>(`/${API_URL.customer.patchCustomer}/${uuid}`, payload)
    }

}