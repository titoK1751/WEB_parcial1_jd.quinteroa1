const API_BASE_URL = "http://localhost:3000/api";

export async function fetcher<T> (endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    const response = await fetch (url, {
        ... options,
        headers: {
            "Content-Type": "application/json",
            ... options?.headers,
        }
    });

    if (!response.ok) {
        const errorInfo = await response.json().catch(() => ({}));
        throw new Error (
            errorInfo.detail || 
            `Request error: ${response.status} ${response.statusText}`
        );
    }

    if (response.status === 204) {
        return undefined as T;
    }

    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
        return undefined as T;
    }

    const rawBody = await response.text();
    if (!rawBody) {
        return undefined as T;
    }

    return JSON.parse(rawBody) as T;
}