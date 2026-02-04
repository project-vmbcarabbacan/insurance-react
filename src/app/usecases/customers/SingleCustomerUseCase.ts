import type { CustomerContract } from "../../../domain/contracts/CustomerContract";
import type { SingleCustomerResponse } from "../../../infrastructure/dtos/CustomerResponse";

export class SingleCustomerUseCase {
    constructor(private customer: CustomerContract) { }

    async execute(uuid: string): Promise<SingleCustomerResponse> {
        return await this.customer.customer(uuid)
    }
}