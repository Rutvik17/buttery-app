import { create } from "zustand";
import { User } from "../models/user";

interface ButteryStore {
    user: User | null;
    setUser: (user: User) => void;
}

const useButteryStore = create<ButteryStore>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
}));

export default useButteryStore;