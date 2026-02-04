

export interface CustomerFilter {
    page: number
    per_page: number
    status?: string
    type?: string
    keyword?: string
    dates: string[]
}

export interface Customer {
    uuid: string
    name: string
    phone: string
    email: string
    status: string
    type: string
}

export interface UpsertCustomer {
    first_name: string
    last_name: string
    phone_number: string
    phone_country_code: string
    email: string
    type: string
    dob: string
    gender: string
    uuid?: string
}