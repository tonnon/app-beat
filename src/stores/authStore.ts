import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { MockUser } from '@/pages/User.Mock';

interface AuthState {
  user: MockUser | null;
  isAuthenticated: boolean;
  login: (user: MockUser) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'app-beat-auth',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
