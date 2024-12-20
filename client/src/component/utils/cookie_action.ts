'use server'
import { cookies } from 'next/headers';

export const getToken = async () => {
    console.log('here get Token');

    // Dùng await để đợi Promise từ cookies()
    const cookieStore = await cookies();
    const token = cookieStore.get('token');
    return token ? token : null;
};


//hàm này thì lấy ra từ cái document cookie
// const getCookie = (name: string) => {
//     const value = `; ${document.cookie}`;
//     const parts = value.split(`; ${name}=`);

//     if (parts.length === 2) {
//         return parts[1].split(';')[0];
//     }

//     return null;
// };

// // Call this function in your component
// const token2 = getCookie('token');
// console.log("Token from cookie:", token2);
