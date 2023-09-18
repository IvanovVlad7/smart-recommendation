import { storage } from "../constans/storage";

interface parsedData {
    id: string,
    message: string,
    name: string,
    role: string
};

export const useCurrentUserData = () => {
    const parsedData: parsedData = JSON.parse(sessionStorage.getItem(storage.userData) || '') ;
    const userId = parsedData.id;
    const userName = parsedData.name;
    const userRole = parsedData.role;
    const isAdmin = parsedData.role === 'admin';
    const isLoggedIn = userId && userName && userRole;

    return {
        isLoggedIn,
        userId,
        userName,
        userRole,
        isAdmin,
    }
};
