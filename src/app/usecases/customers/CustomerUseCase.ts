import type { CustomerFilter } from "../../../core/interfaces/Customer";
import type { CustomerContract } from "../../../domain/contracts/CustomerContract";
import type { CustomerResponse } from "../../../infrastructure/dtos/CustomerResponse";

export class CustomerUseCase {
    constructor(private customer: CustomerContract) { }

    async execute(data: CustomerFilter): Promise<CustomerResponse> {
        return await this.customer.customers(data)
    }
}