import type { CustomerFilter, patchCustomer, UpsertCustomer } from "../../core/interfaces/Customer";
import type { CustomerDetailsResponse, CustomerMessageResponse, CustomerResponse, SingleCustomerResponse } from "../../infrastructure/dtos/CustomerResponse";

export interface CustomerContract {
    customers(data: CustomerFilter): Promise<CustomerResponse>
    customer(uuid: string): Promise<SingleCustomerResponse>
    createCustomer(data: UpsertCustomer): Promise<CustomerMessageResponse>
    updateCustomer(data: UpsertCustomer): Promise<CustomerMessageResponse>
    customerDetails(uuid: string): Promise<CustomerDetailsResponse>
    patchCustomer(data: patchCustomer): Promise<CustomerMessageResponse>
}