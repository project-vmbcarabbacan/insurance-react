import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios'
import type { ApiService } from './ApiService'
import { ApiError } from '../../domain/errors/ApiError'

export class AxiosApiService implements ApiService {
    private client: AxiosInstance

    constructor(baseURL: string) {
        this.client = axios.create({
            baseURL,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        })

        this.registerInterceptors()
    }

    // -----------------------------
    // Interceptors
    // -----------------------------
    private registerInterceptors(): void {
        // Request interceptor
        this.client.interceptors.request.use(
            (config) => {
                // Example: attach CSRF or auth headers here
                // const token = csrfStore.getToken()
                config.headers['X-app-client'] = import.meta.env.VITE_APP_CLIENT
                return config
            },
            (error) => Promise.reject(error)
        )

        // Response interceptor
        this.client.interceptors.response.use(
            (response) => response,
            (error) => Promise.reject(this.normalizeError(error))
        )
    }

    // -----------------------------
    // Error normalization
    // -----------------------------
    private normalizeError(error: unknown): ApiError {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 401) {
                window.location.href = "/login";
                return new ApiError(
                    'Unauthorized',
                    401,
                    error.code
                )
            }
            return new ApiError(
                error.response?.data?.message || 'Request failed',
                error.response?.status,
                error.code
            )
        }



        if (error instanceof Error) {
            return new ApiError(error.message)
        }

        return new ApiError('Unexpected error')
    }

    // -----------------------------
    // HTTP methods
    // -----------------------------
    async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response: AxiosResponse<T> = await this.client.get(url, config)
        return response.data
    }

    async post<T>(
        url: string,
        data?: unknown,
        config?: AxiosRequestConfig
    ): Promise<T> {
        const response: AxiosResponse<T> = await this.client.post(url, data, config)
        return response.data
    }

    // multipart/form-data POST
    async postForm<T>(
        url: string,
        data: FormData,
        config?: AxiosRequestConfig
    ): Promise<T> {
        const response = await this.client.post<T>(url, data, config)
        return response.data
    }

    async put<T>(
        url: string,
        data?: unknown,
        config?: AxiosRequestConfig
    ): Promise<T> {
        const response: AxiosResponse<T> = await this.client.put(url, data, config)
        return response.data
    }

    async patch<T>(
        url: string,
        data?: unknown,
        config?: AxiosRequestConfig
    ): Promise<T> {
        const response: AxiosResponse<T> = await this.client.patch(url, data, config)
        return response.data
    }

    async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response: AxiosResponse<T> = await this.client.delete(url, config)
        return response.data
    }
}
