import { storage } from "../constans/storage";

export const useIsLoggedIn = () => {
    const isLoggedIn = sessionStorage.getItem(storage.userData);

    return {
        isLoggedIn
    }
};
