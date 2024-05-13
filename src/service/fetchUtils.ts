/**
 * @param method //GET, POST, PUT, DELETE
 * @param body //For POST and PUT
 * @returns //Object with method and headers
 */

export function makeOptions(method: string, body: object | null, addToken?: boolean | undefined): RequestInit {
    // export function makeOptions(method: string, body: object | null): RequestInit {
    const opts: RequestInit = {
        method: method,
        headers: {
            "Content-type": "application/json",
            Accept: "application/json",
        },
    };
    if (body) {
        opts.body = JSON.stringify(body);
    }
    if (addToken) {
        //@ts-ignore
        opts.headers["Authorization"] = "Bearer " + localStorage.getItem("token");
    }
    return opts;
}

// function to handle http errors
export async function handleHttpErrors(res: Response) {
    if (!res.ok) {
        const error = await res.json();
        const msg = error.message ? error.message : "Unknown error!";
        throw new Error(msg);
    }
    return res.json();
}
