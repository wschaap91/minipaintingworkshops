const API_URL = '/api';

type EndPoints = Record<string, Record<string, {
    method: string,
    url: string,
    data?: unknown
}>>

const endpoints = {
    shops: {
        list: {
            method: "GET",
            url: "/shops",
        },
    },
    events: {
        list: {
            method: "GET",
            url: "/events",
        },
    }
} satisfies EndPoints;

async function fetchData<
    T extends keyof typeof endpoints,
    U extends keyof (typeof endpoints)[T]
>(
    endpoint: T,
    type: U,
    data?: (typeof endpoints)[T][U] extends { data: infer D } ? D : undefined
) {
    
    const {method, url} = endpoints[endpoint][type] as {method: string, url: string};
    const bearerToken = import.meta.env.VITE_API_BEARER_TOKEN;

    try {
        const response = await fetch(`${API_URL}${url}`, {
            method,
            headers: {
                Authorization: `Bearer ${bearerToken}`,
                "Content-Type": "application/json",
            },
            body: method === "GET" || !data ? null : JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Failed to fetch ${endpoint} - ${String(type)}:`, error);
        throw error;
    }
}

export { fetchData };