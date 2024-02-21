import { MenuItem } from '@/models/models'
import { createStore } from 'zustand/vanilla'
import { create } from 'zustand'
import { persist, createJSONStorage } from "zustand/middleware"

export type OrderState = {
  order: MenuItem[]
}

export type OrderActions = {
  add: (newItem: MenuItem) => void
  remove: (id: string) => void
}

export type OrderStore = OrderState & OrderActions

export const initOrderStore = (): OrderState => {
  return { order: [] }
}

export const defaultInitState: OrderState = {
  order: [],
}

export const createOrderStore = (
  initState: OrderState = defaultInitState,
) => {
  return create<OrderStore>()((set) => ({
    ...initState,
    add: (newItem: MenuItem) => set((state) => ({ order: [...state.order, newItem]})),
    remove: (itemId: string) => set((state) => ({ order: state.order.filter(i => i.id === itemId) })),
  }))
}

export const ceateOrderStore = (
  initState: OrderState = defaultInitState,
) => create<OrderStore>()(
      persist((set, get) => ({
        ...initState,
        add: (newItem: MenuItem) => set((state) => ({ order: [...state.order, newItem]})),
        remove: (itemId: string) => set((state) => ({ order: state.order.filter(i => i.id === itemId) })),
      }),
      {
        name: 'order-storage',
        skipHydration: true,
        storage: createJSONStorage(() => sessionStorage),
      }), 
  )