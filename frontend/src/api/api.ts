const API_URL = process.env.API_URL

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

interface FetchOptions {
    method?: HttpMethod
    body?: unknown
    headers?: Record<string, string>
}

export async function fetchWrapper(
    endpoint: string,
    { method = 'GET', body, headers = {}, ...customOptions }: FetchOptions = {}
) {
    const options: RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json',
            // Add default headers
            ...headers,
        },
        ...customOptions,
    }

    if (body) {
        options.body = JSON.stringify(body)
    }

    const response = await fetch(`${API_URL}${endpoint}`, options)

    if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
    }

    return response.json()
}