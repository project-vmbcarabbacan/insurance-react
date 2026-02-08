import type { patchCustomer } from "../../../core/interfaces/Customer";
import type { CustomerContract } from "../../../domain/contracts/CustomerContract";
import type { CustomerMessageResponse } from "../../../infrastructure/dtos/CustomerResponse";
import { UpsertCustomerError } from "../../errors/UpsertCustomerError";

export class PatchCustomerUseCase {
    constructor(private customer: CustomerContract) { }

    async execute(data: patchCustomer): Promise<CustomerMessageResponse> {
        if (!data.email || !data.phone_number) throw new Error('Invalid input')

        try {
            return await this.customer.patchCustomer(data)
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new UpsertCustomerError(error.message)
            }

            throw new UpsertCustomerError()
        }
    }
}