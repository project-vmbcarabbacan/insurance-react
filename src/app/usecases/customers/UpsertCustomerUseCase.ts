import type { UpsertCustomer } from "../../../core/interfaces/Customer";
import type { CustomerContract } from "../../../domain/contracts/CustomerContract";
import type { CustomerMessageResponse } from "../../../infrastructure/dtos/CustomerResponse";
import { UpsertCustomerError } from "../../errors/UpsertCustomerError";

export class UpsertCustomerUseCase {
    constructor(private customer: CustomerContract) { }

    async execute(data: UpsertCustomer): Promise<CustomerMessageResponse> {
        if (!data.email || !data.first_name || !data.last_name) throw new Error('Invalid input')

        try {
            if (data.uuid) {
                return await this.customer.updateCustomer(data)
            } else {
                return await this.customer.createCustomer(data)
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new UpsertCustomerError(error.message)
            }

            throw new UpsertCustomerError()
        }
    }
}