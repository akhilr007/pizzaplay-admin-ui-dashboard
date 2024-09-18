import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface Tenant {
    id: number;
    name: string;
    address: string;
}

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    tenant?: Tenant;
}

interface AuthState {
    user: User | null;
    setUser: (user: User) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    devtools(
        (set) => ({
            user: null,
            setUser: (user: User) => {
                console.log("setting user", user);
                set({ user });
            },
            logout: () => set({ user: null })
        }),
        { store: "AuthStore" }
    )
);
