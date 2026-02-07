import type { CustomerContract } from "../../../domain/contracts/CustomerContract";
import type { CustomerDetailsResponse } from "../../../infrastructure/dtos/CustomerResponse";

export class CustomerDetailUseCase {
    constructor(private customer: CustomerContract) { }

    async execute(uuid: string): Promise<CustomerDetailsResponse> {
        return await this.customer.customerDetails(uuid)
    }
}