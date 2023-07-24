import { create } from "zustand";
import userService, { User } from "../services/userService";
import { CanceledError } from "../services/apiClient";

interface State {
  user: User | null;
  users: User[];
  isLoading: boolean;
  error: string | null;
  fetchUsers: () => Promise<void>;
  fetchUser: (id: string) => Promise<void>;
  addUser: (user: User) => Promise<void>;
  removeUser: (id: string) => Promise<void>;
  updateUser: (user: User) => Promise<void>;
}

export const useUserStore = create<State>((set, get) => ({
  user: null,
  users: [],
  isLoading: false,
  error: null,
  fetchUsers: async () => {
    set({ isLoading: true, error: null });
    const { request, cancel } = userService.getAll<User>();

    request
      .then((res) => {
        set({ users: res.data, isLoading: false });
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        set({ error: err.message, isLoading: false });
      });
  },
  // Implementation for updateUser, removeUser etc. here
  fetchUser: async (id: string = "") => {
    // Try to find the user in the state
    const user = get().users.find((user) => user.id === id);

    if (user) {
      // If the user is in the state, use that
      set({ user });
    } else {
      // Otherwise, fall back to an API call
      set({ isLoading: true, error: null });
      const { request, cancel } = userService.get<User>(id);

      request
        .then((res) => {
          set({ user: res.data, isLoading: false });
        })
        .catch((err) => {
          if (err instanceof CanceledError) return;
          set({ error: err.message, isLoading: false });
        });
    }
  },
  addUser: async (user: User) => {
    set({ isLoading: true, error: null });
    try {
      const res = await userService.post(user);
      console.log("add user in store:", res.data);
      // dispatch({ type: "ADD_USER", payload: res.data });
      set((state) => ({ users: [...state.users, res.data], isLoading: false }));
    } catch (err) {
      if (err instanceof Error) {
        //   dispatch({ type: "FETCH_USERS_ERROR", payload: err.message });
        set({ error: err.message, isLoading: false });
      }
    }
  },
  removeUser: async (id: string) => {
    set({ isLoading: true, error: null });

    try {
      await userService.delete(id);
      set((state) => ({
        users: state.users.filter((user) => user.id !== id),
        isLoading: false,
      }));
    } catch (err) {
      if (err instanceof Error) {
        set({ error: err.message, isLoading: false });
      }
    }
  },
  updateUser: async (user: User) => {
    set({ isLoading: true, error: null });

    try {
      const res = await userService.update(user);
      set((state) => ({
        users: state.users.map((u) => (u.id === user.id ? res.data : u)),
        isLoading: false,
      }));
    } catch (err) {
      if (err instanceof Error) {
        set({ error: err.message, isLoading: false });
      }
    }
  },
}));
