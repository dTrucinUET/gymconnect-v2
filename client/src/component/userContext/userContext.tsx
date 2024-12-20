'use client'
import React, { createContext, useEffect, useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
const UserContext = createContext<any>(null);

export interface ContextData {
    token: string,
    username: string,
    email: string,
    isAuthenticate: false,
    first_name: string,
    last_name: string,
    role_name: string,
    id: 0
}

const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname(); // Get the current pathname


    const [user, setUser] = useState({
        token: '',
        username: '',
        email: '',
        isAuthenticate: false,
        first_name: '',
        last_name: '',
        role_name: '',
        id: 0
    });



    const loginContext = (userData: ContextData) => {
        setUser({ ...userData })
    };

    const logoutContext = () => {

        setUser(() => ({
            token: '',
            username: '',
            email: '',
            isAuthenticate: false,
            first_name: '',
            last_name: '',
            role_name: '',
            id: 0
        }));
    };

    const router = useRouter();


    const fetchUserContext = async () => {
        console.log('Fetching user data...');
        try {

        } catch (error) {
            console.error('Error fetching user account:', error);

        }
        console.log('User state after fetching:', user);
    };


    useEffect(() => {

        console.log(pathname);

        if (pathname === '/') {
            console.log('hit here');
            fetchUserContext();

        }
        else if (pathname !== '/login') {
            fetchUserContext();
        }
        else {
            setUser(() => ({

                token: '',
                username: '',
                email: '',
                isAuthenticate: false,
                first_name: '',
                last_name: '',
                role_name: '',
                id: 0
            }));
        }
    }, [pathname]);

    return (
        <UserContext.Provider value={{ user, loginContext, logoutContext }}>
            {children}

        </UserContext.Provider>

    );
}

export { UserContext, UserProvider }