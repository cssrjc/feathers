import { create } from 'zustand';
import { RewardItem, EventItem } from './types';

interface UserFeatherState {
  search: string;
  feathers: number | null;
  value: number;
  setSearch: (search: string) => void;
  clearSearch: () => void;
  setFeathers: (feathers: number | null) => void;
  clearFeathers: () => void;
  setValue: (value: number) => void;
  clearValue: () => void;
}

export const useUserFeatherStore = create<UserFeatherState>((set) => ({
  search: '',
  feathers: null,
  value: 0,
  setSearch: (search) => set({ search }),
  clearSearch: () => set({ search: '' }),
  setFeathers: (feathers) => set({ feathers }),
  clearFeathers: () => set({ feathers: null }),
  setValue: (value) => set({ value }),
  clearValue: () => set({ value: 0 }),
}));

interface RewardsState {
  rewards: RewardItem[];
  setRewards: (rewards: RewardItem[]) => void;
  clearRewards: () => void;
}

export const useRewardsStore = create<RewardsState>((set) => ({
  rewards: [],
  setRewards: (rewards) => set({ rewards }),
  clearRewards: () => set({ rewards: [] }),
}));

interface EventsState {
  events: EventItem[];
  setEvents: (events: EventItem[]) => void;
  clearEvents: () => void;
}

export const useEventsStore = create<EventsState>((set) => ({
  events: [],
  setEvents: (events) => set({ events }),
  clearEvents: () => set({ events: [] }),
}));

/* clear functions are not used in the app yet, but they are useful if you want to reset the state of 
the store at any point, for example, when a user logs out or when you want to clear the data after a certain action. 
You can call these functions to reset the respective state to its initial value. */