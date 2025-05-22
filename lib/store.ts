import { create } from 'zustand';
import { RewardItem, EventItem } from './types';

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