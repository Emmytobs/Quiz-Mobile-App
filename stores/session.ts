import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { StateStorage } from "~/lib/stateStorage";

type SessionStore = {
  session: Session | null
  setSession: (session: Session) => void 
  reset: () => void 
}

export interface Session {
  access: string;
  refresh: string;
  user: User
}

export interface User {
  first_name: string,
  last_name: string,
  email: string,
  is_verified: boolean,
  avatar: string | null,
  is_student: boolean,
  is_active: boolean
}

const initialState = null;

const useSession = create( 
  persist<SessionStore>(
    (set) => ({
      session: initialState,
      setSession: (session: Session) => {
        set({ session });
      },
      reset: () => {
        set({ session: initialState });
      }
    }),
    {
      name: 'session',
      storage: createJSONStorage(() => StateStorage)
    }
  )
)

export {
  useSession
}