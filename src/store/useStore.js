import { create } from 'zustand'

export const useStore = create((set) => ({
  currentZone: null,
  detailOpen: false,
  loading: true,
  avatarPosition: { x: 0, z: 0 },

  setCurrentZone: (zone) => set({ currentZone: zone }),
  openDetail: () => set({ detailOpen: true }),
  closeDetail: () => set({ detailOpen: false }),
  setLoading: (val) => set({ loading: val }),
  setAvatarPosition: (pos) => set({ avatarPosition: pos }),
}))
