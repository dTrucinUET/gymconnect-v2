'use server'
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const customFetch = async (url: string, options: any = {}) => {
    //Get and check token
    console.log('hit custom fetch');

    const cookie = await cookies();
    const token = cookie.get('token');

    // no token
    if (!token) {
        return new Response(JSON.stringify({
            EM: "You are not authorized, please login.",
            EC: -1,
            DT: '',
        }), {
            status: 401,
            statusText: 'Unauthorized'
        });
    }

    //config header
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.value}`,
        ...options.headers,
    };

    //fetch
    const response = await fetch(url, {
        ...options,
        headers: {
            ...headers,
            ...options.headers,
        },
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return response;
};

export default customFetch;
