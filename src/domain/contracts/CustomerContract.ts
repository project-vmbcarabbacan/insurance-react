import type { CustomerFilter, UpsertCustomer } from "../../core/interfaces/Customer";
import type { CustomerMessageResponse, CustomerResponse, SingleCustomerResponse } from "../../infrastructure/dtos/CustomerResponse";

export interface CustomerContract {
    customers(data: CustomerFilter): Promise<CustomerResponse>
    customer(uuid: string): Promise<SingleCustomerResponse>
    createCustomer(data: UpsertCustomer): Promise<CustomerMessageResponse>
    updateCustomer(data: UpsertCustomer): Promise<CustomerMessageResponse>
}