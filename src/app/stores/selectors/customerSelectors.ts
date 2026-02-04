import { Customer } from "../../../domain/entities/Customer";
import type { RootState } from "../store";

export const selectCustomerAsEntities = (state: RootState) => state.customer.customers.map(customer =>
    new Customer(
        customer.uuid,
        customer.name,
        customer.email,
        customer.status,
        customer.phone,
        customer.type
    )
)