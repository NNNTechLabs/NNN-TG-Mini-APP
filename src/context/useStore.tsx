import { create } from "zustand";
import { GameMission } from "../types";

interface StoreTypes {
  isLoginOpen: boolean;
  setIsLoginOpen: (value: boolean) => void;

  isSignUpOpen: boolean;
  setIsSignUpOpen: (value: boolean) => void;

  isCreateSquadOpen: boolean;
  setIsCreateSquadOpen: (value: boolean) => void;

  isJoinSquadOpen: boolean;
  setIsJoinSquadOpen: (value: boolean) => void;

  selectedMission: GameMission[];
  setSelectedMission: (value: GameMission[]) => void;

  userEnergy: number;
  setUserEnergy: (value: number) => void;

  userMaxEnergy: number;
  setUserMaxEnergy: (value: number) => void;
}

export const useStore = create<StoreTypes>((set) => ({
  // Login popup
  isLoginOpen: false,
  setIsLoginOpen: (value: boolean) => set({ isLoginOpen: value }),

  // Signup content
  isSignUpOpen: false,
  setIsSignUpOpen: (value: boolean) => set({ isSignUpOpen: value }),

  // Create squad
  isCreateSquadOpen: false,
  setIsCreateSquadOpen: (value: boolean) => set({ isCreateSquadOpen: value }),

  // Join squad
  isJoinSquadOpen: false,
  setIsJoinSquadOpen: (value: boolean) => set({ isJoinSquadOpen: value }),

  // Selected mission for popup
  selectedMission: [],
  setSelectedMission: (value: GameMission[]) => set({ selectedMission: value }),

  // User energy (MY station)
  userEnergy: 0,
  setUserEnergy: (value: number) => set({ userEnergy: value }),

  // User max energy (MY station)
  userMaxEnergy: 100,
  setUserMaxEnergy: (value: number) => set({ userMaxEnergy: value }),
}));
