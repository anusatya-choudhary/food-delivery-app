import { getCurrentUser } from '@/lib/appwrite';
import { create } from 'zustand';

type AuthState = {
    isAuthenticated: boolean;
    user: User | null;
    isLoading: boolean;

    setIsAuthenticated: (value: boolean) => void;
    setUser: (user: User | null) => void;
    setIsLoading: (value: boolean) => void;

    fetchAuthentictaed: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    user: null,
    isLoading: false,

    setIsAuthenticated: (value: boolean) => set({ isAuthenticated: value }),
    setUser: (user: User | null) => set({ user }),
    setIsLoading: (value: boolean) => set({ isLoading: value }),

    fetchAuthentictaed: async () => {
        set({ isLoading: true });
        try {
            const user = await getCurrentUser();
            if (user) {
                set({ isAuthenticated: true, user: user as User });
            }
            else {
                set({ isAuthenticated: false, user: null });
            }
        }
        catch (e) {
            console.log('fetchAuthentictaed error', e);
            set({ isAuthenticated: false, user: null });
        }
        finally {
            set({ isLoading: false });
        }
    }
}))